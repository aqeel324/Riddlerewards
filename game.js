const questions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris", reward: 10 },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4", reward: 10 },
    { question: "What is the largest planet in our solar system?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: "Jupiter", reward: 10 },
    { question: "What is the smallest prime number?", answers: ["0", "1", "2", "3"], correct: "2", reward: 10 },
    { question: "Who wrote 'To Kill a Mockingbird'?", answers: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], correct: "Harper Lee", reward: 10 }
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let totalEarnings = parseFloat(localStorage.getItem('totalEarnings')) || 0;
const MIN_WITHDRAW_AMOUNT = 10000; // Minimum amount for withdrawal

// Function to display the current question
function displayQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const question = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.answers.map((answer) => `
            <button onclick="checkAnswer('${answer}')">${answer}</button>
        `).join('')}
    `;
    
    document.getElementById('result').innerText = '';
    document.getElementById('earningsAmount').innerText = totalEarnings.toFixed(2);
    document.getElementById('nextButton').style.display = 'none'; // Hide next button initially
}

// Function to check the user's answer
function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (selectedAnswer === correctAnswer) {
        totalEarnings += questions[currentQuestionIndex].reward;
        localStorage.setItem('totalEarnings', totalEarnings);
        document.getElementById('result').innerText = `Correct! You've earned Rs. ${questions[currentQuestionIndex].reward}. Total Earnings: Rs. ${totalEarnings.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = `Wrong answer. The correct answer was ${correctAnswer}. Total Earnings: Rs. ${totalEarnings.toFixed(2)}`;
    }

    document.getElementById('nextButton').style.display = 'inline'; // Show next button
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        document.getElementById('questionContainer').innerHTML = `<h2>Game Over! Your total earnings are Rs. ${totalEarnings.toFixed(2)}</h2>`;
        document.getElementById('nextButton').style.display = 'none'; // Hide next button
        document.getElementById('restartButton').style.display = 'inline'; // Show restart button
    }
}

// Function to restart the game
function restartGame() {
    currentQuestionIndex = 0;
    totalEarnings = 0;
    localStorage.setItem('totalEarnings', totalEarnings);
    displayQuestion();
    document.getElementById('restartButton').style.display = 'none'; // Hide restart button initially
}

// Function to show withdrawal options
function showWithdrawOptions() {
    if (totalEarnings >= MIN_WITHDRAW_AMOUNT) {
        document.getElementById('withdrawOptions').style.display = 'block';
    } else {
        alert(`You need to have at least Rs. ${MIN_WITHDRAW_AMOUNT} to withdraw. Your current balance is Rs. ${totalEarnings.toFixed(2)}`);
    }
}

// Function to process withdrawal
function processWithdrawal(method) {
    if (totalEarnings >= MIN_WITHDRAW_AMOUNT) {
        alert(`Successfully withdrawn Rs. ${totalEarnings.toFixed(2)} via ${method}`);
        totalEarnings = 0; // Reset the earnings after withdrawal
        localStorage.setItem('totalEarnings', totalEarnings);
        document.getElementById('earningsAmount').innerText = '0.00'; // Update UI
        document.getElementById('withdrawOptions').style.display = 'none'; // Hide withdrawal options
    }
}

// Start the game
window.onload = function() {
    displayQuestion();

    document.getElementById('nextButton').addEventListener('click', nextQuestion);
    document.getElementById('restartButton').addEventListener('click', restartGame);
};