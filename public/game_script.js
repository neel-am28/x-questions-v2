const question = document.querySelector('#question');
const questionCounterText = document.querySelector('#questionCounter');
const game = document.querySelector('#game');
const progressBar = document.querySelector('#progressBar');
const header = document.querySelector('.header');
const loader = document.querySelector('#loader');
const scoreText = document.querySelector('#score');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let questions = [];

axios.get('/getQuizData').then((response) => {
    questions = response.data;
    startGame();
}).catch((err) => {
    console.log(err);
})

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    progressBar.classList.remove('hidden');
    header.classList.remove('hidden');
    loader.classList.add('hidden');
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to end page
        return window.location.assign('/end');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
    // Update progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['option' + number];
        choice.style.transition = 'none !important';
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

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}