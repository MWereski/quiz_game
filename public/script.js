const question = document.querySelector('#question');
const gameBoard = document.querySelector('#gameBoard');
const h2 = document.querySelector('h2');

function fillQuestionElements(data){

    if(data.winner === true){
        gameBoard.style.display = 'none';
        h2.innerText = 'WYGRANA!!oneone1111';
        return;
    }

    question.innerText = data.question;

    for(const i in data.answers){
        
        const answerEl = document.querySelector(`#answer${Number(i)+1}`);
        answerEl.innerText = data.answers[i]

    }
}

function showNextQuestion(){
    fetch('/question', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data =>{
            //console.log(data);
            fillQuestionElements(data);
        });
}

showNextQuestion();
const goodAnswerSpan = document.querySelector('#goodAnswer');
function handleAnswerFeedback(data){

    goodAnswerSpan.innerText = data.goodAnswer;
    showNextQuestion();
}
function sendAnswer(answerIndex){
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(r => r.json())
        .then(data =>{
            handleAnswerFeedback(data);
        });
}

const buttons = document.querySelectorAll('button');
for(const button of buttons){
    button.addEventListener('click', (event) => {

        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);

    })
}