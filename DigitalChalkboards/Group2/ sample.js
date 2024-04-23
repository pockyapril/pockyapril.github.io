document.addEventListener('DOMContentLoaded', () => {
    // Add this line to confirm the script is loaded
    console.log('Script loaded!');

    const triviaButton = document.getElementById('trivia-submit');
    const triviaInput = document.getElementById('trivia-answer');

    // Ensure we attach the event listener to the button
    triviaButton.addEventListener('click', function(event) {
        event.preventDefault();
        checkTriviaAnswer();
    });

    // Optional: bind the Enter key for the trivia input
    triviaInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkTriviaAnswer();
        }
    });

    const numberInput = document.getElementById("numberInput");
    numberInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkNumber();
        }
    });
});

function checkTriviaAnswer() {
    const answer = document.getElementById('trivia-answer').value.trim();
    const responseElement = document.getElementById('trivia-response');

    if (answer.toLowerCase() === "paris") {
        responseElement.textContent = `Correct! You guessed ${answer}`;
    } else {
        responseElement.textContent = `Incorrect! You guessed ${answer}`;
    }
}

function checkNumber() {
    const number = document.getElementById("numberInput").value;
    const num = parseInt(number);

    if (!isNaN(num) && num >= 10000 && num <= 99999) {
        const isEven = num % 2 === 0;
        document.getElementById("output").innerText = `The number ${num} is ${isEven ? "even" : "odd"}.`;
    } else {
        document.getElementById("output").innerText = "Please enter a valid 5-digit number.";
    }
}

