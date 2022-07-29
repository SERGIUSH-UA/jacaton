const Router = require('express')
const router = new Router()
const answerController = require('../controllers/answerController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('CAPTAIN'), answerController.add)
router.get('/', checkRole('CAPTAIN'), answerController.getAll)
router.get('/:id', checkRole('CAPTAIN'), answerController.getByID)
router.delete('/:id', checkRole('ADMIN'), answerController.delete)
router.patch('/:id', checkRole('ADMIN'), answerController.update)

module.exports = router