document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('trivia-answer').addEventListener('keypress', function (tri) {
      if (tri.key === 'Enter') {
        checkTriviaAnswer();
      }
    });
  
    document.getElementById('number-input').addEventListener('keypress', function (num) {
      if (num.key === 'Enter') {
        checkNumber();
      }
    });
  });
  
  function checkTriviaAnswer() {
    const answer = document.getElementById('trivia-answer').value;
    const resultDiv = document.getElementById('trivia-result');
    const correctAnswer = 'Paris';

    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      resultDiv.textContent = `Correct! You guessed ${answer}.`;
    } else {
      resultDiv.textContent = `Incorrect! You guessed ${answer}.`;
    }
  }
  
  function checkNumber() {
    const number = document.getElementById('number-input').value;
    const resultDiv = document.getElementById('number-result');
    if (!/^\d{5}$/.test(number)) {
      resultDiv.textContent = 'Please enter a 5-digit number!';
    } else {
      const isEven = parseInt(number, 10) % 2 === 0;
      resultDiv.textContent = `${number} is an ${isEven ? 'even' : 'odd'} number.`;
    }
  }
  