const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')

router.post('/', questionController.add)
router.get('/', questionController.getAll)
router.get('/:id', questionController.getByID)
router.patch('/:id', questionController.update)
router.delete('/:id', questionController.delete)


module.exports = router