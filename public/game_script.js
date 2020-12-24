const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;


const getData = () => {
    axios.get('/getQuizData').then((response) => {
        let questions = response.data;
        startGame = () => {
            questionCounter = 0;
            score = 0;
            availableQuestions = [...questions];
            getNewQuestion();
        }

        getNewQuestion = () => {
            if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
                // go to end page
                return window.location.assign('/end');
            }
            questionCounter++;
            const questionIndex = Math.floor(Math.random() * availableQuestions.length);
            currentQuestion = availableQuestions[questionIndex];
            question.innerHTML = currentQuestion.question;

            choices.forEach(choice => {
                const number = choice.dataset['number'];
                choice.innerText = currentQuestion['option' + number];
            })
            availableQuestions.splice(questionIndex, 1);
            acceptingAnswers = true;
        }

        choices.forEach(choice => {
            choice.addEventListener('click', (e) => {
                if (!acceptingAnswers) return;
                acceptingAnswers = false;
                const selectedChoice = e.target;
                const selectedAnswer = selectedChoice.dataset['number'];
                const classToApply = selectedAnswer == currentQuestion.correctAnswer ? "correct" : "incorrect";
                selectedChoice.parentElement.classList.add(classToApply);
                setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply);
                    getNewQuestion();
                }, 1000);
            })
        })
        startGame();

    }).catch(() => {
        console.log(err);
    })
}

getData()