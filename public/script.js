const question = document.querySelector('#question');
const gameBoard = document.querySelector('#gameBoard');
const h2 = document.querySelector('h2');

function fillQuestionElements(data){

    if(data.winner === true){
        gameBoard.style.display = 'none';
        h2.innerText = 'WYGRANA!!oneone1111';
        return;
    }

    if(data.looser === true){
        gameBoard.style.display = 'none';
        h2.innerText = 'Przegrałeś! Spróbuj ponownie! ';
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

const buttons = document.querySelectorAll('.answer-button');
for(const button of buttons){
    button.addEventListener('click', (event) => {

        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);

    })
}
const tipDiv = document.querySelector('#tip');

function  handleFriendAnswer(data){
    tipDiv.innerText = data.text;
}
function callToAFriend(){
    //callToFriend
    fetch(`/help/friend`, {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data =>{
            handleFriendAnswer(data);
        });
}

function  handlehalfOnHalfAnswer(data){
    
    if(typeof data.text === 'string'){
        tipDiv.innerText = data.text;
    }else{
        for(const button of buttons){
            if(data.answerToRemove.indexOf(button.innerText) > -1){
                button.innerText = ''
            }
        }
    }

}
function halfOnHalf(){
    //callToFriend
    fetch(`/help/half`, {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data =>{
            handlehalfOnHalfAnswer(data);
        });
}

function  handlequestionToTheCrowdAnswer(data){

    if(typeof data.text === 'string'){
        tipDiv.innerText = data.text;
    }else{
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText}: ${percent}%`
        });
    }

}
function questionToTheCrowd(){
    //callToFriend
    fetch(`/help/crowd`, {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data =>{
            handlequestionToTheCrowdAnswer(data);
        });
}

document.querySelector('#questionToTheCrowd').addEventListener('click', questionToTheCrowd);
document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf);
document.querySelector('#callToFriend').addEventListener('click', callToAFriend);