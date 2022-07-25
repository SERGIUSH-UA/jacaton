const Router = require('express')
const router = new Router()
const teamController = require('../controllers/teamController')

router.post('/', teamController.add)
router.get('/', teamController.getAll)
router.get('/:id', teamController.getByID)
router.delete('/:id', teamController.delete)
router.patch('/:id', teamController.update)

module.exports = router