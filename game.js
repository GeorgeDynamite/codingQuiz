//sets the question variable question to affect the id 'question' on html
const question = document.getElementById("question");
//creates an array from the class "choice response"
const choices = Array.from(document.getElementsByClassName("choice-response"));
// set current question to null
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
// sets availableQuestions to an empty array to be filled by running the startGame function
var availableQuestions = [];
//defines each question, the 4 choices, and the correct answer as properties of an object in an array.
// I'm not 100% clear why but it sorts through the choices and applies the number value to the string value of the choices. If my choices
//were not named choice1 choice2 etc this would not work
let questions = [
    {
        question: "An array is contained within",
        choice1: "Square brackets []",
        choice2: "Curly brackets {}",
        choice3: "Quotation marks ''",
        choice4: "Paretheses ()",
        answer: 1
    },
    {
        question: "Const and let are types of",
        choice1: "Operators",
        choice2: "Variables",
        choice3: "Functions",
        choice4: "If else statments",
        answer: 2
    },
    {
        question: "Which is the correct way to link a .js file",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How would you write 'hello world' in an alert box",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }];
//assign variables for score and number or questions asked.
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;
//runs function to start the game setting questionCounter to 0 and score to 0. Then calls on the getNewQuestion
startGame = () => {
    questionCounter = 0;
    score = 0;
    // uses the spread operation to take each object within the questions array and put it into a new array
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion()
};

getNewQuestion = () => {
    // If all the questions have been asked redirects the user to a new page.
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("./end.html")
    }
    // adds 1 to the questionCounter
    questionCounter++;
    //sets the text of the question counter to questionCounter incremented above, places a /  then accesses the MAX_QUESTIONS const
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // assigns questionIndex to a random number, rounded down, multiplied by the length of the availableQuestions array
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //sets currentQuestion to grab from the availableQuestions array. Uses questionIndex variable we just made to pick randomly
    currentQuestion = availableQuestions[questionIndex];
    //sets the html element, defined using get elementbyID in the question variable. currentQuestion.question accesses the question paramater
    question.innerText = currentQuestion.question;
    //choices has been turned into an array, this iterates through the choice paramater in the array
    choices.forEach(choice => {
        //create the number variable, gets a reference to the dataset property of number in my html
        const number = choice.dataset['number'];
        //grabs 'choice' from the property of the questions array(choice1, choice2), then puts the arrayed 'choice' into the correct place using the data
        choice.innerText = currentQuestion['choice' + number];
    });
    //accesses the availableQuestions array, and uses splice to eliminate the question we just used
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
//
choices.forEach(choice => {
    //adds a listener for the event 'click' passes click as an argument
    choice.addEventListener('click', e => {
        //stops the user from clickng through before the page has loaded
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        //sets selectedChoice variable to the target that was just clicked
        const selectedChoice = e.target;
        //
        const selectedAnswer = selectedChoice.dataset['number'];
        //"terniary operator" if selectedAnswer(what they clicked) is equal to the actual correct answer assign the value 'correct', if not assign value 'incorrect'
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // If the class 'correct' is applied
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        //ads the 'correct' or 'incorrect' class to the parent container
        selectedChoice.parentElement.classList.add(classToApply);

        //setTimeout is a function built into javascript. Takes a callback function, then a parameter of how long you want to delay
        setTimeout(() => {
            //removes the correct or incorrect class    
            selectedChoice.parentElement.classList.remove(classToApply);
            //runs the function again
            getNewQuestion();
            //delay of 1000ms
        }, 1000);


    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            return window.location.assign("./end.html")
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};