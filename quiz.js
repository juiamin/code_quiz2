var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');



var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuesions = [];

var questions = [
  {
    "question": "The default value of a static inter variable of a class in java is ??",
    "choice1": "0",
    "choice2": "1",
    "choice3": "Garbage value",
    "choice4": "Null",
    "answer": 1
  },
  {
    "question": "To prevent any method from overriding,we declarw the method as?",
    "choice1": "static",
    "choice2": "const",
    "choice3": "final",
    "choice4": "abstract",
    "answer": 3
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  }

];

var CORRECT_BONUS = 5;
var MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  //console.log(availableQuesions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {

    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  var questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;


  choices.forEach(choice => {
    var number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;

};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    // console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];
    //console.log(selectedAnswer);

    var classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      if (classToApply === "correct") {
        console.log('hi')
      incrementScore(CORRECT_BONUS);
    }

    //console.log(classToApply);
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    //console.log(selectedAnswer ==currentQuestion.answer);


  });
});


incrementScore = num => {
  score += num;
  scoreText.innerHTML = score;
};

startGame();