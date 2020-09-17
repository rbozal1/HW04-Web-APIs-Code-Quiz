// get the highScores list and turn it back into an object
var restartBtn = document.querySelector(".restartBtn");
var clearBtn = document.querySelector(".clearBtn");
var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
var scoreList = document.getElementById("scoreList");

// sort scores from high to low
highScores.sort(function (a,b){
return b.score - a.score
})

// displays the scores
for (var i = 0; i < highScores.length; i++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[i].name + " - " + highScores[i].score
    scoreList.appendChild(newLi)
}
    
// click handler clears scoreboard
clearBtn.addEventListener("click", function () {
    newLi.innerHTML ="";
    window.localStorage.clear();
    
});
// click handler restarts the quiz
restartBtn.addEventListener("click", function () {
    history.back();
});
