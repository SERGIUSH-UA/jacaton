const {User} = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("../service/token-service");
const mailService = require("../service/mail-service");
const {validationResult} = require("express-validator");

class UserService {

    addRole = async (user, role) => {
        let userRoles = user.role.split(';')
        if (!userRoles.includes(role)){
            userRoles.push(role)
            user.role = userRoles.join(';')
        }
        await User.update({role: user.role}, {where: {id: user.id}})
    }

    removeRole = async (user, role) => {
        let userRoles = user.role.split(';')
        const newUserRoles = userRoles.filter((roleAr) => roleAr !== role)
        await User.update({role: newUserRoles}, {where: {id: user.id}})
    }

    haveRole = (user, role) => {
        let userRoles = user.role.split(';')
        return userRoles.includes(role)
    }

    registration = async (email, password, next) => {
        if (!email || !password){
            throw ApiError.badRequest('Логін або пароль пусті!')
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            throw ApiError.badRequest('Користувач з таким емейлом існує!')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4();
        let role = 'USER'
        const users = await User.findAll()
        if(users.length === 0){
            role = 'USER;CAPTAIN;ADMIN'
        }
        const user = await User.create({email, role, password: hashPassword, name: activationLink, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activation/${activationLink}`)
        return tokenService.generateJWT(user.id, user.email, user.role)
     }

    login = async (email, password) => {
        if (!email || !password){
            throw ApiError.badRequest('Логін або пароль пусті!')
        }
        const user = await User.findOne({where:{email}})
        if (!user){
            throw ApiError.badRequest('Користувач з таким емейлом не існує!')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            throw ApiError.badRequest('Пароль не вірний!')
        }
        return tokenService.generateJWT(user.id, user.email, user.role)
    }

    updateRoles = async (userID, user, roles) => {
        try{
            if(userID) {
                user = await User.findByPk(userID)
            }
            for await (const role of roles) {
                await this.addRole(user, role)
            }
            return user.role
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    }

    activation = async (activationLink) => {
        try{
           const user = await User.findOne({where:{activationLink, isActivated:false}})
            if (!user){
                throw ApiError.badRequest('Даний лінк не дійсний!')
            }
            user.set({isActivated:true})
            await user.save()
            return tokenService.generateJWT(user.id, user.email, user.role)
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    }

    checkAuth = async (id, email, role) => {
        try {
            return  tokenService.generateJWT(id, email, role)
        }
        catch (e) {
            throw ApiError.internal(e.message)
        }
    };

    getByID = async (id) => {
        try {
            const user = await User.findByPk(id, {attributes: {exclude: ['password']}});
            return user;
        }
        catch (e) {
            throw ApiError.internal(e.message)
        }
    }
}

module.exports = new UserService();