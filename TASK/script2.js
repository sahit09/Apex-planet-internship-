const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false },
        ]
    },
    {
        question: "The Great Barrier Reef is located off the coast of which country?",
        answers: [
            { text: "Brazil", correct: false },
            { text: "Australia", correct: true },
            { text: "Mexico", correct: false },
            { text: "Indonesia", correct: false },
        ]
    },
    {
        question: "Mount Everest is in which mountain range?",
        answers: [
            { text: "Andes", correct: false },
            { text: "Rockies", correct: false },
            { text: "Himalayas", correct: true },
            { text: "Alps", correct: false },
        ]
    },
    {
        question: "Which river is the longest in the world?",
        answers: [
            { text: "Amazon", correct: false }, // Nile is technically longer, but Amazon by volume. For general knowledge, Nile is often cited.
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("results");
const scoreDisplay = document.getElementById("score-display");
const totalQuestionsDisplay = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    quizSection.classList.remove("hidden");
    resultsSection.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all buttons after one is selected
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Show the correct answer
        }
        button.removeEventListener("click", selectAnswer); // Prevent multiple selections
        button.disabled = true; // Visually disable as well
    });
    nextButton.classList.remove("hidden"); // Show the next button
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    scoreDisplay.innerHTML = score;
    totalQuestionsDisplay.innerHTML = questions.length;
    nextButton.classList.add("hidden"); // Hide next button on results screen
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // If next is clicked on results screen, restart. (Though restart button is there)
    }
});

restartButton.addEventListener("click", startQuiz);

// Initial call to start the quiz when the page loads
startQuiz();