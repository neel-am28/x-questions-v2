const Game = require('../models/Game')

exports.game = (req, res) => {
    res.render('game')
}

exports.highscores = (req, res) => {
    res.send("highscore")
}

exports.home = (req, res) => {
    res.render('home');
}

exports.getQuizData = (req, res) => {
    Game.getData()
        .then((quizData) => {
            res.json(quizData)
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.endGame = (req, res) => {
    res.render('end');
}