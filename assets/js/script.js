
//create questions
var quizQuestions = [
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "The condition in an if/else statement is enclosed within ______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What is the syntax for referencing an external script called 'abc.js'?",
        choices: ["<script class='abc.js'>", "<script href='abc.js'>", "<script link='abc.js'>", "<script src='abc.js'>"],
        answer: "<script src='abc.js'>"
    },
    {
        title: "Which type of pop up box will allow a user to type a response?",
        choices: ["input", "prompt", "alert", "confirm"],
        answer: "prompt"
    },
    {
        title: "What is a DOM in JavaScript?",
        choices: ["Data of Mine", "Document of Master", "Data Object Modal", "Document Object Model"],
        answer: "Document Object Model"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];

var startBtn = document.getElementById("startBtn");
var home = document.getElementById("home");
var timerEl= document.getElementById("timer");
var submitBtn = document.querySelector("#submitBtn");
var userScoreEl = document.querySelector("#finalScore");
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");


//global variables
var secondsLeft = 75;
var currentQuestion = 0;
var countdown;
var answer;
var userNameInput;



function startQuiz() {
    //swap home screen with questions
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

   // timer set and begins 75s countdown
    startTimer();  
    
    // displays questions
    showQuestions();

}

function startTimer(){
   
    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || currentQuestion === quizQuestions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
  }



function showQuestions() {
    currentQuestion++;
    answer = quizQuestions[currentQuestion].answer

    questionsEl.textContent = quizQuestions[currentQuestion].title;
    answersEl.innerHTML = "";

    var choices = quizQuestions[currentQuestion].choices;

    for(var i = 0; i < choices.length;i++){
    var nextOption = document.createElement("button");
    
    nextOption.textContent = choices[i]
    answerBtn = answersEl.appendChild(nextOption).setAttribute("class", "p-3 m-1 btn btn-light btn-block");  
}

    }
//displays user's final score
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submitScore").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
    }

    // main Event Listeners buttons
    startBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        addScore();
        
        window.location.href = './highscores.html'
    });     
 // adds the new user's score on the scoreboard 
function addScore () {
    userNameInput = document.getElementById("userName").value
    // create a new object with name and score keys
    var newScore = {
    name: userNameInput,
    score: secondsLeft
    };
    // retrieves arrays from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
   
    // push object into score array
    highScores.push(newScore)
    //turn object'highscores' into an array of strings using the stringify method
    //sets it into the local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

}
//hides a message regarding the correct/incorrect answer
function hideMessage(){
    var pEl= document.getElementsByClassName("message")[0]
    pEl.style.display='none'
}
//displays a message regarding the correct/incorrect answer
function showMessage(){
    var pEl= document.getElementsByClassName("message")[0]
    pEl.removeAttribute('style');
}

answersEl.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("message")[0]
    
    // evaluation of user's answer choices & message
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback,1000);
        showMessage();   
    } else {
        pEl.innerHTML = "Sorry, that's incorrect.";
        setTimeout(hideMessage,1000);
        secondsLeft = secondsLeft - 10;
        showMessage();
    }    
    showQuestions();
 });

 
    
   


