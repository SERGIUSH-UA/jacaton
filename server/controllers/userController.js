const ApiError = require('../error/ApiError')
const userService = require('../service/user-service')
const {validationResult} = require("express-validator");

class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest('Помилка при валідації', errors.array()));
        }
        const {email, password, firstName, lastName} = req.body;
        let name = firstName + " " + lastName;
        name = name.trim();
        try {
            const token = await userService.registration(email, password, name, next);
            return res.status(200).json({token});
        } catch (e) {
            return next(e);
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        try {
            const token = await userService.login(email, password, next);
            res.status(200).json({token})
        } catch (e) {
            next(e)
        }
    }

    async checkAuth(req, res, next) {
        try {
            const token = await userService.checkAuth(req.user.id, req.user.email, req.user.role)
            if (token) {
                const user = await userService.getByID(req.user.id);
                res.status(200).json(user)}
            else {
                res.status(401).json({message: 'Помилка авторизації токену. Перезайдіть!'})
            }
        }
        catch (e) {
            next(e)
        }
    }

    async updateRoles(req, res, next) {
        const {userID, roles} = req.body
        let user = req.user
        try{
            const newRoles = await userService.updateRoles(userID, user, roles)
            res.status(200).json({roles: newRoles})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async activation(req, res, next) {
        const link = req.params.link
        try {
            await userService.activation(link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async edit(req, res, next) {
        const userID = req.params.id;
        let user = req.body;
        try {
            const editUser = await userService.edit(userID, user)
            res.status(200).json(editUser)
        } catch (e) {
            return next(e);
        }
    }

    async delete(req, res) {
        res.status(200).json({message: true})
    }
}

module.exports = new UserController()