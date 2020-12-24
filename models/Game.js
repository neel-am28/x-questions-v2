const gameCollection = require('../db').db().collection('quiz-data');

const getData = function () {
    return new Promise((resolve, reject) => {
        gameCollection.find().toArray()
            .then((quizData) => {
                resolve(quizData)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getData }
