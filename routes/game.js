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

        res.json({
            correct: isGoodAnswer,
            goodAnswer,
        });

    });
}

module.exports = gameRoutes;