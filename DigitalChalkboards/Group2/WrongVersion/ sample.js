document.addEventListener('DOMContentLoaded', () => {
    const triviaInput = document.getElementById('trivia-answer');
    triviaInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleTrivia();
        }
    });

    const triviaButton = document.getElementById('trivia-submit');
    triviaButton.addEventListener('click', handleTrivia);

    const numberInput = document.getElementById("numberInput");
    numberInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkNumber();
        }
    });
});

function handleTrivia() {
    const answer = document.getElementById('trivia-answer').value.trim().toLowerCase();
    const responseElement = document.getElementById('trivia-response');
    const correctAnswer = "paris";
    if (answer === correctAnswer) {
        responseElement.textContent = `Correct! You guessed ${answer}`;
    } else {
        responseElement.textContent = `Incorrect! You guessed ${answer}, but the correct answer is ${correctAnswer}.`;
    }
}

function checkNumber() {
    const number = document.getElementById("numberInput").value.trim();
    const num = parseInt(number);
    if (!isNaN(num) && number === num.toString() && num >= 10000 && num <= 99999) {
        const isEven = num % 2 === 0;
        document.getElementById("output").innerText = `The number ${num} is ${isEven ? "even" : "odd"}.`;
    } else {
        document.getElementById("output").innerText = `Please enter a valid 5-digit number.`;
    }
}


