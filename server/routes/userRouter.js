const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.checkAuth)
router.delete('/del/:id', checkRole('ADMIN'), userController.delete)
router.patch('/role', checkRole('ADMIN'), userController.updateRole)
module.exports = router