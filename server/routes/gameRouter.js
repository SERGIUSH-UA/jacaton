const Router = require('express')
const router = new Router()
const gameController = require('../controllers/gameController')

router.post('/', gameController.add)
router.get('/', gameController.getAll)
router.get('/:id', gameController.getByID)
router.delete('/:id', gameController.delete)
router.patch('/close/:id', gameController.close)

module.exports = router