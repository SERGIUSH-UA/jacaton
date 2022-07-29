const Router = require('express')
const router = new Router()
const gameController = require('../controllers/gameController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), gameController.add)
router.get('/', gameController.getAll)
router.get('/:id', gameController.getByID)
router.delete('/:id', checkRole('ADMIN'), gameController.delete)
router.patch('/close/:id', checkRole('ADMIN'), gameController.close)

module.exports = router