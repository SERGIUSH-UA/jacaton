const ApiError = require('../error/ApiError')
class UserController {
    async registration(req, res) {
        res.status(200).json({message: true})
    }

    async login(req, res) {
        res.status(200).json({message: true})
    }

    async checkAuth(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('ID is required'))
        }
        res.status(200).json({message: true})
    }

    async delete(req, res) {
        res.status(200).json({message: true})
    }
}

module.exports = new UserController()