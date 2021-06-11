import express from 'express'
import Utils from '../models/UtilsModels'
import Cars from '../models/CarsModel'
import { subtractThreeHours } from '../utils/dateFormat'

class UtilsController {
    async get(request: express.Request, response: express.Response) {
        try {
            const utils: any = await Utils.find()
                .populate([
                    { path: 'driver', select: 'name' },
                    { path: 'car', select: 'plate color brand' },
                ])
                .select(' -createdAt -updatedAt -__v')

            return response.status(200).json({
                message: 'Lista de entrega dos veículo obtida com sucesso',
                utils,
            })
        } catch (err) {
            response.status(404).send({
                message: 'Erro ao carregar a lista de entregas de veículos',
                error: err.message,
            })
        }
    }
    async createUtil(request: express.Request, response: express.Response) {
        let message = 'Erro ao criar utilização'
        try {
            let data = request.body
            const date = new Date()

            const car: any = await Cars.findOne({
                _id: data.car,
                isAvailable: true,
            })

            const driver: any = await Utils.findOne({
                driver: data.driver,
            }).sort({ _id: -1 })

            if (driver?.endDate) {
                message = 'Este motorista está utilizando um carro no momento'
                throw new Error('Este motorista está utilizando um carro no momento')
            }

            if (!car) {
                message = 'Este carro está indisponível no momento ou inexistente'
                throw new Error('Este carro está indisponível no momento ou inexistente')
            }

            data['startDate'] = subtractThreeHours(date)
            const util = await new Utils(data).save()

            car.isAvailable = false
            car.save()

            return response
                .status(201)
                .json({ message: 'Utilização do veículo criado com sucesso', util })
        } catch (err) {
            response.status(404).send({ message, error: err.message })
        }
    }

    async finish(request: express.Request, response: express.Response) {
        try {
            const date = new Date()
            const { id } = request.params
            const util: any = await Utils.findOne({ _id: id })

            if (util?.endDate) {
                return response.status(200).json({ message: 'Entrega já realizada' })
            }

            const car: any = await Cars.findOne({ _id: util.car })

            util['endDate'] = subtractThreeHours(date)
            car['isAvailable'] = true

            util.save()
            car.save()

            return response
                .status(200)
                .json({ message: 'Entrega do veículo com sucesso' })
        } catch (err) {
            response
                .status(404)
                .send({ message: 'Erro ao finalizar a entrega', error: err.message })
        }
    }
}

export default new UtilsController()
