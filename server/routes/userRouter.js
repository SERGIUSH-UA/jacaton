const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const {body} = require('express-validator')

router.post('/registration', body('email').isEmail(),
    body('password').isLength({min:6, max:32}),
    userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.checkAuth)
router.delete('/del/:id', checkRole('ADMIN'), userController.delete)
router.patch('/role', checkRole('ADMIN'), userController.updateRoles)
router.get('/activation/:link', userController.activation)
module.exports = router