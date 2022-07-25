const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const answerRouter = require('./answerRouter')
const gameRouter = require('./gameRouter')
const teamRouter = require('./teamRouter')
const questionRouter = require('./questionRouter')


router.use('/user', userRouter)
router.use('/answer', answerRouter)
router.use('/game', gameRouter)
router.use('/team', teamRouter)
router.use('/question', questionRouter)

module.exports = router