import express from 'express'
import Cars from '../models/CarsModel'
import { Error } from 'mongoose'
import { plateValidation } from '../utils/plateValidation'

class CarsController {
    async getCars(request: express.Request, response: express.Response) {
        try {
            const cars = await Cars.find({ trashed: false }).select(
                '-trashed -createdAt -updatedAt -__v'
            )
            return response.status(200).json(cars)
        } catch (err) {
            response.status(404).send({
                message: 'Lista de veículos não encontrada',
                error: err.message,
            })
        }
    }

    async createCar(request: express.Request, response: express.Response) {
        let message = 'Erro ao criar veículo'
        try {
            const data = request.body

            if (!data.plate || !data.color || !data.brand) {
                message = 'Placa, cor e marca são campos obrigatórios'
                throw new Error('Placa, cor e marca são campos obrigatórios')
            }

            if (!plateValidation(data.plate)) {
                throw new Error('Placa inválida')
            }

            const car = await new Cars(data).save()
            return response
                .status(201)
                .json({ message: 'Veículo criado com sucesso', car })
        } catch (err) {
            response.status(404).send({ message, error: err.message })
        }
    }

    async deleteCar(request: express.Request, response: express.Response) {
        const { plate } = request.body
        let message = 'Erro ao remover veículo ou placa inexistente'

        try {
            const car: any = await Cars.findOne({ plate })
            if (car.trashed === true) {
                car.trashed = false
                message = 'Veículo removido com sucesso'
            } else {
                car.trashed = true
                message = 'Veículo recuperado com sucesso'
            }
            await car.save()
            return response.json({ message, car })
        } catch (err) {
            response.status(404).send({
                message,
                error: err.message,
            })
        }
    }

    async filterCars(request: express.Request, response: express.Response) {
        let text = request.query.text as string
        try {
            const $regex = new RegExp(`${text}`, 'i')
            const cars = await Cars.aggregate([
                {
                    $facet: {
                        items: [
                            {
                                $match: { $or: [{ brand: { $regex } }, { color: { $regex } }] },
                            },
                        ],
                    },
                },
            ])
            return response
                .status(200)
                .json({ message: 'Lista filtrada com sucesso', cars })
        } catch (err) {
            response.status(404).send({
                message: 'Erro ao filtrar a lista de veículos',
                error: err.message,
            })
        }
    }

    async updateCar(request: express.Request, response: express.Response) {
        const { id } = request.params
        const data = request.body
        let message = 'Erro ao atualizar veículo'
        try {
            const { plate, color, brand } = request.body

            if (!plate || !color || !brand) {
                message = 'Placa, cor e marca são campos obrigatórios'
                throw new Error('Placa, cor e marca são campos obrigatórios')
            }

            if (!plateValidation(plate)) {
                throw new Error('Placa inválida')
            }

            await Cars.findOneAndUpdate({ _id: id }, data)
            return response.json({ message: 'Veículo atualizado com suceso' })
        } catch (err) {
            response.status(404).send({
                message,
                error: err.message,
            })
        }
    }
}

export default new CarsController()
