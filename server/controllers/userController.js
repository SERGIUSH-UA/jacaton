const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const uuid = require("uuid");
const jwt = require("jsonwebtoken");


const generateJWT = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Логін або пароль пусті!'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Користувач з таким емейлом існує!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const name = uuid.v4();
        const user = await User.create({email, role, password: hashPassword, name})
        const token = generateJWT(user.id, user.email, user.role)
        res.status(200).json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Логін або пароль пусті!'))
        }
        const user = await User.findOne({where:{email}})
        if (!user){
            return next(ApiError.badRequest('Користувач з таким емейлом не існує!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Пароль не вірний!'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        res.status(200).json({token})
    }

    async checkAuth(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        res.status(200).json({token})
    }

    async delete(req, res) {
        res.status(200).json({message: true})
    }
}

module.exports = new UserController()