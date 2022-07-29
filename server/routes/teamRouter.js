const Router = require('express')
const router = new Router()
const teamController = require('../controllers/teamController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', teamController.add)
router.get('/', teamController.getAll)
router.get('/:id', teamController.getByID)
router.delete('/:id', checkRole('ADMIN'), teamController.delete)
router.patch('/:id', checkRole('CAPTAIN'), teamController.update)

module.exports = router