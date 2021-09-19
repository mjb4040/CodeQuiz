var startDiv = document.getElementById("start-div");
var gameDiv = document.getElementById("game-div");
var finishDiv = document.getElementById("finish-div");
var startButtonDiv = document.getElementById("start-button");
var questionHolderDiv = document.getElementById("question-holder");

var questions = [
  {
    text: "Where do you put JavaScript Scripts in HTML?",
    options: ["Head or Body sections", "Knees and Toes", "Head and Shoulders", "Header and Footer"],
    answer: "Head or Body sections",
  },
  {
    text: "When do JavaScript Scripts execute?",
    options: ["Never", "Within 30 Seconds", "Occasionally", "Immediately"],
    answer: "Immediately",
  },
  {
    text: "How many scripts can you have in a document?",
    options: ["0", "Unlimited", "30", "Some"],
    answer: "Unlimited",
  },

  {
    text: "Is JavaScript case sensitive?",
    options: ["Maybe So", "I have no Idea", "Yes", "No"],
    answer: "Yes",
  },

  {
    text: "Is using a semi colon at the end of a statement mandatory?",
    options: ["No", "Yes", "Maybe So", "I have no Idea"],
    answer: "woods",
  },

  {
    text: "How are JavaScript comments started?",
    options: ["{}", "[]", "*!", "//"],
    answer: "//",
  },

  {
    text: "Can a variables value change during the execution of a script?",
    options: ["Yes", "No", "Maybe So", "I have no Idea"],
    answer: "Yes",
  },

  {
    text: "Which of the following are not types of pop-up boxes? ",
    options: ["Confirm", "Prompt", "Alert", "Console"],
    answer: "Console",
  },

  {
    text: "Which of the following is NOT a type of loop in JavaScript?",
    options: ["While", "For", "Switch"],
    answer: "woods",
  },

  {
    text: "Can a variables value change during the execution of a script?",
    options: ["Yes", "No", "Maybe So", "I have no Idea"],
    answer: "woods",
  },
];

var qIdx = 0;

var score = {
  correct: 0,
  incorrect: 0
}

var countdown;
var timeLeft = 300

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
        alert("Well Done!");
        score.correct++;
      } else {
        alert("Doh! So Close! Keep going!");
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
