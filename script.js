let questions = [
    {
        "question": "Was bedeutet HTML?",
        "answer_1": "Hype the Muddel",
        "answer_2": "Eine Gesellschaft",
        "answer_3": "Hypertext Markup Language",
        "answer_4": "Nichts was man wissen muss",
        "right_answer": 3,
    },
    {
        "question": "Wer ist der Gründer von Apple?",
        "answer_1": "Jeff Bezos",
        "answer_2": "Will Smith",
        "answer_3": "Steve Jobs",
        "answer_4": "Johnny Depp",
        "right_answer": 3,
    },
    {
        "question": "Wie heißt der Hauptcharakter von Zelda?",
        "answer_1": "Zelda natürlich",
        "answer_2": "Duke",
        "answer_3": "Ganon",
        "answer_4": "Link",
        "right_answer": 4,
    },
    {
        "question": "Welche Teufelsfrucht hat Monkey D Ruffy?",
        "answer_1": "Gummi",
        "answer_2": "Feuer",
        "answer_3": "All-You-Can-Eat",
        "answer_4": "Garnix",
        "right_answer": 1,
    },
    {
        "question": "Wer ist der most-badass Charakter aus One Piece?",
        "answer_1": "Marco",
        "answer_2": "Zorro",
        "answer_3": "Whitebeard",
        "answer_4": "Shanks",
        "right_answer": 2,
    }
];


let rightQuestions = 0;
let currentQuestion = 0;
let Audio_Success = new Audio('audio/success.mp3');
let Audio_Wrong = new Audio('audio/wrong.mp3');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        ShowEndScreen();
    } else { 
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;     
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question']; 
    document.getElementById('answer_1').innerHTML = question['answer_1']; 
    document.getElementById('answer_2').innerHTML = question['answer_2']; 
    document.getElementById('answer_3').innerHTML = question['answer_3']; 
    document.getElementById('answer_4').innerHTML = question['answer_4']; 
}


function ShowEndScreen() {
 document.getElementById('endScreen').style = '';
 document.getElementById('question-body').style = 'display: none';
 document.getElementById('amount-of-questions').innerHTML = questions.length;
 document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
 document.getElementById('header-img').src = 'img/trophy.png';
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(selectedQuestionNumber == question['right_answer']) { // Richtige Frage beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success');
        Audio_Success.play();
        rightQuestions++;
    }   else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        Audio_Wrong.play();
    }
    document.getElementById('next-button').disabled = false;
}


function nextQuestion() {
    currentQuestion++; // z.B. von 0 auf 1
    document.getElementById('next-button').disabled = true; // Button wird wieder unanklickbar
    resetAnswerButtons(); // Die Funktion wird aufgerufen und die Klassen werden entfernt
    showQuestion(); // Frage wird aufgerufen
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    document.getElementById('header-img').src = 'img/pencil.jpg';
    document.getElementById('question-body').style = ''; // questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; // Endscreen ausblenden

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}