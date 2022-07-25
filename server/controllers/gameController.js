const {Game} = require('../models/models')
const ApiError = require('../error/ApiError')

class GameController {

    async getAll(req, res, next) {
        const games = await Game.findAll()
        return res.status(200).json(games)
    }

    async getByID(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const game = await Game.findByPk(id)
        if (!game) {
            return res.status(204).end()
        }
        return res.status(200).json(game)
    }

    async add(req, res) {
        const game = await Game.create()
        return res.status(200).json(game)
    }

    async close(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        await Game.update({active: false}, {where: {id: id}})
        return res.status(200).json({message: 'Game closed!'})
    }

    async delete(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const game = await Game.findByPk(id)
        await game.destroy();
        return res.status(200).json({message: true})
    }

}

module.exports = new GameController()