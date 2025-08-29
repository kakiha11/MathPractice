// Math Practice App - Simple JavaScript for Students
// This file uses basic JavaScript concepts: variables, functions, events, and conditionals

// ========== VARIABLES ==========
// These variables store the game state
let score = 0;
let streak = 0;
let totalProblems = 0;
let correctAnswers = 0;
let accuracy = 0;
let currentAnswer = 0;
let difficulty = 'easy';

// Badge progress tracking
let firstCorrectEarned = false;
let easyProblemsCorrect = 0;
let mediumProblemsCorrect = 0;
let hardProblemsCorrect = 0;
let notificationTimer;

// ========== FUNCTIONS ==========

// Function to generate a new math problem
function generateNewProblem() {
    // TODO: Add your problem generation logic here
    // Example: Create random numbers based on difficulty level
    // Update the problem display on the webpage
    if(difficulty === 'easy') {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let problem = num1 + ' + ' + num2 + ' = ?';
        document.getElementById('problem').textContent = problem;
        currentAnswer = num1 + num2;
    }
    
    if(difficulty === 'medium') {
        let num1 = Math.floor(Math.random() * 50) + 1;
        let num2 = Math.floor(Math.random() * 50) + 1;
        let problem = num1 + ' + ' + num2 + ' = ?';
        document.getElementById('problem').textContent = problem;
        currentAnswer = num1 + num2;
    }
    
    if(difficulty === 'hard') {
        let num1 = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * 100) + 1;
        let problem = num1 + ' + ' + num2 + ' = ?';
        document.getElementById('problem').textContent = problem;
        currentAnswer = num1 + num2;
    }
}

// Function to check if the user's answer is correct
function checkAnswer() {
    // TODO: Add your answer checking logic here
    // Get the user's input from the answer field
    // Compare it to the correct answer
    // Call updateScore() with true or false
    let userAnswer = parseInt(document.getElementById('answer-input').value);
    document.getElementById('answer-input').value = '';
    document.getElementById('submit-btn').disabled = true;
    if(userAnswer === currentAnswer) {
        updateScore(true);
    } else {
        updateScore(false);
    }
}

// Function to update the score and streak
function updateScore(isCorrect) {
    // TODO: Add your scoring logic here
    // If answer is correct: increase score and streak
    // If answer is wrong: reset streak
    // Update the display
    // Check for new badges
    totalProblems += 1;
    if(isCorrect) {
        correctAnswers += 1;
        streak += 1;
        if(!firstCorrectEarned) {
            firstCorrectEarned = true;
        }
        if(difficulty === 'easy' && easyProblemsCorrect < 3) {
            easyProblemsCorrect += 1;
        }
        if(difficulty === 'medium' && mediumProblemsCorrect < 3) {
            mediumProblemsCorrect += 1;
        }
        if(difficulty === 'hard' && hardProblemsCorrect < 3) {
            hardProblemsCorrect += 1;
        }
        checkBadges();
    } else {
        streak = 0;
    }
    updateDisplay();
    
}

// Function to check if any badges should be unlocked
function checkBadges() {
    // TODO: Add your badge checking logic here
    // Check if conditions are met for each badge:
    // - First Correct: firstCorrectEarned
    // - Easy Master: easyProblemsCorrect >= 3
    // - Medium Master: mediumProblemsCorrect >= 3  
    // - Hard Master: hardProblemsCorrect >= 3
    if(firstCorrectEarned) {
        unlockBadge('first-correct');
    }
    if(easyProblemsCorrect >= 3) {
        unlockBadge('easy-master');
    }
    if(mediumProblemsCorrect >= 3) {
        unlockBadge('medium-master');
    }
    if(hardProblemsCorrect >= 3) {
        unlockBadge('hard-master');
    }
}

// Function to unlock a specific badge
function unlockBadge(badgeId) {
    // TODO: Add your badge unlocking logic here
    // Remove the 'locked' class from the badge
    // Add the 'earned' class to the badge
    // Show the badge notification
    let badge = document.getElementById(badgeId);
    badge.classList.remove('locked');
    badge.classList.add('earned');
    //show the badge notification
    let notification = document.getElementById('badge-notification');
    notification.classList.add('show');
    document.getElementById('notification-badge-name').textContent = badge.querySelector('.badge-name').textContent;
    clearTimeout(notificationTimer); // Clear any existing timer
notificationTimer = setTimeout(() => {
    notification.classList.remove('show');
}, 3000);
}

// Function to update all the numbers and text on the webpage
function updateDisplay() {
    // TODO: Add your display update logic here
    // Update score, streak, total problems, correct answers
    // Update accuracy percentage
    // Update badges earned count
    
    if(totalProblems > 0) {
        accuracy = Math.round((correctAnswers / totalProblems) * 100);
    }

    //document.getElementById('score').textContent = score;
    document.getElementById('streak').textContent = streak;
    document.getElementById('total-problems').textContent = totalProblems;
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('accuracy').textContent = accuracy;
    //document.getElementById('badges-earned').textContent = badgesEarned;
    generateNewProblem();
    document.getElementById('submit-btn').disabled = false;  // Re-enable the submit button
}

// Function to change the difficulty level
function changeDifficulty(newDifficulty) {
    // Change the difficulty variable
    difficulty = newDifficulty;
    // Generate a new problem with the new difficulty
    generateNewProblem();
}

// ========== EVENT LISTENERS ==========
// These run when the webpage loads
document.addEventListener('DOMContentLoaded', function() {
    
    // TODO: Add event listeners for buttons and inputs
    // Examples:
    
    // When submit button is clicked, check the answer
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
    
    // When new problem button is clicked, generate new problem
    document.getElementById('new-problem-btn').addEventListener('click', generateNewProblem);
    
    // When difficulty dropdown changes, update difficulty
    document.getElementById('difficulty').addEventListener('change', function(event) {
        changeDifficulty(event.target.value);
    });
    
    // When user presses Enter in the answer input, check answer
    document.getElementById('answer-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Start the app by generating the first problem
    generateNewProblem();
    updateDisplay();
});
