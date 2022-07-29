const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), questionController.add)
router.get('/', questionController.getAll)
router.get('/:id', questionController.getByID)
router.patch('/:id', checkRole('ADMIN'), questionController.update)
router.delete('/:id', checkRole('ADMIN'), questionController.delete)


module.exports = router