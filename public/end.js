const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
let output = 0;

const mostRecentScore = localStorage.getItem('mostRecentScore');


const timer = setInterval(() => {

    finalScore.innerText = `${output}`;
    if (output == mostRecentScore) {
        clearInterval(timer);
    } else {
        output++;
    }
}, 10);

saveHighScore = (e) => {
    e.preventDefault();
}