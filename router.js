const express = require('express')
const router = express.Router()
const gameController = require('./controllers/gameController')



router.get('/', gameController.home)

router.get('/game', gameController.game)

router.get('/getQuizData', gameController.getQuizData)

router.get('/highscores', gameController.highscores)

module.exports = router