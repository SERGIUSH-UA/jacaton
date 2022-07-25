const Router = require('express')
const router = new Router()
const answerController = require('../controllers/answerController')

router.post('/', answerController.add)
router.get('/', answerController.getAll)
router.get('/:id', answerController.getByID)
router.delete('/:id', answerController.delete)
router.patch('/:id', answerController.update)

module.exports = router