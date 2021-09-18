var startDiv = document.getElementById("start-div");
var gameDiv = document.getElementById("game-div");
var finishDiv = document.getElementById("finish-div");
var startButtonDiv = document.getElementById("start-button");
var questionHolderDiv = document.getElementById("question-holder");

var questions = [
  {
    text: "Who's the coolest dude?",
    options: ["Sam", "Mike", "Arsema", "Donna"],
    answer: "Donna",
  },
  {
    text: "What's the best food",
    options: ["rice", "beans", "salsa", "eggs"],
    answer: "salsa",
  },
  {
    text: "What's the best place",
    options: ["beach", "woods", "mountains", "lake"],
    answer: "woods",
  },
];

var qIdx = 0;

var score = {
  correct: 0,
  incorrect: 0
}

var countdown;
var timeLeft = 15

startButtonDiv.addEventListener("click", runQuiz);

function runQuiz(e) {
  e.preventDefault();
  startDiv.style.display = "none";
  gameDiv.style.display = "block";
  showQuestion();
  runTimer();
}

function runTimer() {
  countdown = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if(timeLeft <= 0) {
      endGame("Oh no! Out of time. Here's your score")
    }
  }, 1000)
}

function showQuestion() {
  questionHolderDiv.innerHTML = "";
  var currentQuestion = questions[qIdx];
  var questionText = document.createElement("h4");
  questionText.textContent = currentQuestion.text;
  questionHolderDiv.appendChild(questionText);
  questionHolderDiv.appendChild(showButtons());
}

function showButtons() {
  var buttonHolder = document.createElement("div");
  var currentOptions = questions[qIdx].options;
  var correctAnswer = questions[qIdx].answer;
  for (var i = 0; i < currentOptions.length; i++) {
    var optionButton = document.createElement("button");
    optionButton.textContent = currentOptions[i];
    optionButton.addEventListener("click", function () {
      if (this.textContent === correctAnswer) {
        alert("correct!");
        score.correct++;
      } else {
        alert("HA! wrong.");
        score.incorrect++;
      }
      qIdx++;
      if (qIdx < questions.length) {
        showQuestion();
      } else {
        endGame("All finished! Here's your score");
      }
    });
    buttonHolder.appendChild(optionButton);
  }
  return buttonHolder;
}

function endGame(message) {
  clearInterval(countdown)
  var correctDiv = document.createElement("h4")
  correctDiv.textContent = "correct: " + score.correct;
  var incorrectDiv = document.createElement("h4")
  incorrectDiv.textContent = "incorrect: " + score.incorrect;
  document.getElementById("finish-message").textContent = message
  finishDiv.appendChild(correctDiv)
  finishDiv.appendChild(incorrectDiv)
  gameDiv.style.display = "none";
  finishDiv.style.display = "block";
}
