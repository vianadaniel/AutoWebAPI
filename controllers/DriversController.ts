import express from 'express'
import Drivers from '../models/DriversModel'

class DriversController {
  async getDrivers(request: express.Request, response: express.Response) {
    try {
      const drivers = await Drivers.find().select(' -createdAt -updatedAt -__v')
      return response
        .status(200)
        .json({ message: 'Lista de motoristas encontrada', drivers })
    } catch (err) {
      response.status(404).send({
        message: 'Lista de motoristas não encontrada',
        error: err.message,
      })
    }
  }

  async createDriver(request: express.Request, response: express.Response) {
    try {
      const data = request.body

      const driver = await new Drivers(data).save()
      return response
        .status(201)
        .json({ message: 'Motorista criado com sucesso', driver })
    } catch (err) {
      response
        .status(404)
        .send({ message: 'Erro ao criar motorista', error: err.message })
    }
  }

  async deleteDriver(request: express.Request, response: express.Response) {
    const { id } = request.params
    let message = 'Erro ao remover motorista'
    try {
      const driver: any = await Drivers.findById({ _id: id })
      if (driver.trashed === true) {
        driver.trashed = false
        message = 'Motorista removido com sucesso'
      } else {
        driver.trashed = true
        message = 'Motorista recuperado com sucesso'
      }
      await driver.save()
      return response.status(200).json({ message, driver })
    } catch (err) {
      response.status(404).send({
        message,
        error: err.message,
      })
    }
  }

  async filterDriver(request: express.Request, response: express.Response) {
    let text = request.query.text as string

    try {
      const $regex = new RegExp(`${text}`, 'i')
      const drivers = await Drivers.aggregate([
        {
          $facet: {
            items: [{ $match: { name: { $regex } } }],
          },
        },
      ])
      return response
        .status(200)
        .json({ message: 'Lista filtrada com sucesso', drivers })
    } catch (err) {
      response.status(404).send({
        message: 'Erro ao filtrar a lista de motoristas',
        error: err.message,
      })
    }
  }

  async updateDriver(request: express.Request, response: express.Response) {
    const { id } = request.params
    const data = request.body
    let message = 'Erro ao atualizar motorista'
    try {
      const { name } = request.body

      if (!name) {
        message = 'Nome é um campo obrigatório'
        throw new Error('Nome é um campo obrigatório')
      }

      await Drivers.findOneAndUpdate({ _id: id }, data)

      return response.json({ message: 'Motorista atualizado com suceso' })
    } catch (err) {
      response.status(404).send({
        message,
        error: err.message,
      })
    }
  }
}

export default new DriversController()
