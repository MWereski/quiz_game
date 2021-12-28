function gameRoutes(app){
    let goodAnswer = 0;
    let isGameOver = false;
    let callToAFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;

    const questions = [
        {
            question: 'Jaki jest najlepszy język programowania?',
            answers:['C#', 'JAVA', 'JS', 'Python'],
            correctAnswer: 2,
        },
        {
            question: 'Czy ten kurs jest fajny?',
            answers:['Tak', 'Nie', 'Lama', 'Węgoż'],
            correctAnswer: 0,
        },
        {
            question: 'Jakiego koloru jest czerwony maluch?',
            answers:['Zielony', 'Czarny', 'Okoń', 'Czerwony'],
            correctAnswer: 3,
        }
    ];

    app.get('/question', (req, res) => {

        if (goodAnswer === questions.length){
            res.json({
                winner: true,
            });
        } else if(isGameOver){
            res.json({
                looser: true,
            });
        }else{

            const nextQuestion = questions[goodAnswer];
            const {question, answers} = nextQuestion;

            res.json({
                question, answers,
            });
        }

    });

    app.post('/answer/:index', (req, res) => {

        if(isGameOver) {
            res.json({
                looser: true,
            });
        }
        
        const {index} = req.params;
        
        const question = questions[goodAnswer];
        
        const isGoodAnswer = question.correctAnswer === Number(index);

        if(isGoodAnswer) goodAnswer++;
        else{
            isGameOver = true;

        }
        console.log(isGoodAnswer, goodAnswer)
        res.json({
            correct: isGoodAnswer,
            goodAnswer,
        });

    });
    app.get('/help/friend', (req, res) => {
        if(callToAFriendUsed){
            return res.json({
                text:'To koło było już wykorzystane.'
            });
        }
        callToAFriendUsed = true;
        const doesFriendKnowAnswer = Math.random() > 0.1;

        const question = questions[goodAnswer];

        res.json({
            text: doesFriendKnowAnswer ? `Wydaje mi się że odpowiedź to ${question.answers[question.correctAnswer]}` : 'Nie mam pojęciea'

        });
    })

    app.get('/help/half', (req, res) => {
        if(halfOnHalfUsed){
            return res.json({
                text:'To koło było już wykorzystane.'
            });
        }
        halfOnHalfUsed = true;

        const question = questions[goodAnswer];

        const answerCopy = question.answers.filter((s, index) => (
                index!== question.correctAnswer
            ));

            answerCopy.splice(~~(Math.random() * answerCopy.length), 1);


        res.json({
           answerToRemove: answerCopy,

        });
    })

    app.get('/help/crowd', (req, res) =>{
        const chart = [10, 20, 30, 40]

if(questionToTheCrowdUsed){
    return res.json({
        text:'To koło było już wykorzystane.'
    });
}questionToTheCrowdUsed = true;
        const question = questions[goodAnswer];

        for(let i = chart.length-1; i > 0; i--){
            const change = Math.floor(Math.random() * 20 - 10);

            chart[i] += change;
            chart[i - 1] -= change;
        }
        const {correctAnswer} = question;

        [chart[3], chart[correctAnswer]] = 
        [chart[correctAnswer], chart[3]];

        res.json({
            chart: chart
        });

    });
}

module.exports = gameRoutes;