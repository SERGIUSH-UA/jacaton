const uuid = require('uuid')
const path = require('path')
const {Team} = require("../models/models");
const ApiError = require("../error/ApiError");

class TeamController {

    async getAll(req, res, next) {
        const teams = await Team.findAll()
        return res.status(200).json(teams)
    }

    async getByID(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const team = await Team.findByPk(id)
        if (!team) {
            return res.status(204).end()
        }
        return res.status(200).json(team)
    }

    async add(req, res, next) {
        try {
            const {name, city, parish, captainId} = req.body
            let fileName = ''
            if (req.files) {
                const {img} = req.files
                fileName =uuid.v4() + ".jpg"
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const team = await Team.create({name, city, img: fileName, parish, captainId})
            return res.status(200).json(team)
        }
        catch(e){
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        try {
            const team = await Team.findByPk(id)
            await team.set(req.body)
            await team.save();
            if (req.files) {
                const {img} = req.files
                let fileName =uuid.v4() + ".jpg"
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
                await team.set({img: fileName})
                await team.save();
                return res.status(200).json(team)
            }
            return res.status(200).json(team)
        }
        catch(e){
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const team = await Team.findByPk(id)
        await team.destroy();
        return res.status(200).json({message: true})
    }
}

module.exports = new TeamController()