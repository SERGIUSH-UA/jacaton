const {Question} = require("../models/models");
const ApiError = require("../error/ApiError");

class QuestionController {

    async getAll(req, res, next) {
        const questions = await Question.findAll()
        return res.status(200).json(questions)
    }

    async getByID(req, res, next) {
        const id = req.params.id
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        const question = await Question.findByPk(id)
        if (!question) {
            return res.status(204).end()
        }
        return res.status(200).json(question)
    }

    async add(req, res, next) {
        try {
            const {title, description, answer, questionId} = req.body
            const question = await Question.create({title, description, answer, questionId})
            return res.status(200).json(question)
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
            const question = await Question.findByPk(id)
            await question.set(req.body)
            await question.save();
            return res.status(200).json(question)
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
        const question = await Question.findByPk(id)
        await question.destroy();
        return res.status(200).json({message: true})
    }

}

module.exports = new QuestionController()