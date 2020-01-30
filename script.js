var questions = [
    {
        title: "What is a variable?",
        select: ["A Variables are used to store information to be referenced and manipulated in a computer program", 
        "A static piece of data",
        "A block of code that performs a set of actions",
        "A collection of data that makes up a greater whole"],
        answer: "Variables are used to store information to be referenced and manipulated in a computer program"
    },

    {
        title: "How are arrays declared?",
        select: ["()",
        "[]",
        "{}"],
        answer: "[]" 
    },

    {
        title: "What kind of variable can you apply math operations to?",
        select: ["Strings", "Booleans", "Integers", "All of the above"],
        answer: "Integaers"
    },

    {
        title: "If you want to store a collection of data, what type of variable should you use?",
        select: ["Strings", "Array", "Object", "Boolean"],
        answer: "Array"
    },

    {
        title: "Is Java Script a compiled or interpreted language?",
        select: ["Compiled","Interpreted"],
        answer: "Interpreted"
    }
];


var time = questions.length * 18;
var timeInterval;
var questionCounter = 0;
var score = 0;

var highscore = JSON.parse(window.localStorage.getItem("highscore"));


var startButtonEl = document.getElementById("startBtn");
var timeDisplayEl = document.getElementById("timerDisplay");
var questionTitleEl = document.getElementById("questionTitle");
var answerSelectEl = document.getElementById("answerSelect");
var quizAreaEl = document.getElementById("quizArea");
var scoreScreenEl = document.getElementById("scoreScreen");
var scoreListEl = document.getElementById("scoreList");
var highScoreEl = document.getElementById("highscores");
var clearButton = document.getElementById("clearScore");

function startButton(){
    highScoreEl.setAttribute("class","hide");
    timeInterval = setInterval(runTimer, 1000);
    displayQuestions();

};

function displayQuestions(){
    quizAreaEl.removeAttribute("class", "hide");
    var currentQuestion = questions[questionCounter];
    questionTitleEl.textContent = currentQuestion.title;
    answerSelectEl.innerHTML = "";
    currentQuestion.select.forEach(function(select,i){
        var createSelectBtn = document.createElement("button");
        createSelectBtn.setAttribute("class","select");
        createSelectBtn.setAttribute("value", select);
        createSelectBtn.innerHTML = select;
        
        createSelectBtn.onclick = answerCheck;

        answerSelectEl.appendChild(createSelectBtn);

    })
    
};

function answerCheck(){
    if(this.value !== questions[questionCounter].answer){
        time -= 10;
    }
    timeDisplayEl.textContent = time;

    questionCounter++;
    score++;
    if (questionCounter === questions.length){
        end();
        saveScore();
    }
    else{

        displayQuestions();
    }

};

function end(){

    clearInterval(timeInterval);
    finalScore = (score+time) *2;
    alert("Your score was: " + finalScore);

    
};

function runTimer(){
    time--;
    timeDisplayEl.textContent = time;
    if(time < 0){
        end();
        saveScore();
    }
};

function saveScore(){
    var initials = prompt("Enter your initials");
    
    var addScore = {
        score: finalScore,
        initials: initials
    };
    highscore.push(addScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscore));
    console.log(highscore);
    highScoreEl.removeAttribute("class","hide");
    quizAreaEl.setAttribute("class","hide");
    questionCounter = 0;
    time = questions.length * 18;
    displayScores();
};

function clearScores(){
    highscore = [];
    displayScores();
}; 
function displayScores(){
    highscore.forEach(function(score){
        
        var newLi = document.createElement("li");
        newLi.textContent = score.initials + "-" + score.score;
    
        scoreListEl.appendChild(newLi);
        
    });
};

clearButton.onclick = clearScores;
startButtonEl.onclick = startButton;