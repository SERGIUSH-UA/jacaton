const {Answer} = require("../models/models");
const ApiError = require("../error/ApiError");

class AnswerController {

    async getAll(req, res, next) {
        let {page, limit} = req.query
        page = page || 1
        limit = limit || 200
        let offset = (page - 1) * limit
        const answers = await Answer.findAndCountAll({limit, offset})
        return res.status(200).json(answers)
    }

    async getByID(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const answer = await Answer.findByPk(id)
        if (!answer) {
            return res.status(204).end()
        }
        return res.status(200).json(answer)
    }

    async add(req, res, next) {
        try {
            const {questionId, body, teamId} = req.body
            const date = Date.now()
            let success = false
            const answer = await Answer.create({questionId, teamId, body, date, success})
            return res.status(200).json(answer)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        try {
            const answer = await Answer.findByPk(id)
            await answer.set(req.body)
            await answer.save();
            return res.status(200).json(answer)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const answer = await Answer.findByPk(id)
        await answer.destroy();
        return res.status(200).json({message: true})
    }


}

module.exports = new AnswerController()