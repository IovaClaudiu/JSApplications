// Game value
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector("#game"),
  UIminNum = document.querySelector(".min-num"),
  UImaxNum = document.querySelector(".max-num"),
  UIguessBtn = document.querySelector("#guess-btn"),
  UIguessInput = document.querySelector("#guess-input"),
  UImessage = document.querySelector(".message");

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
UIgame.addEventListener("mousedown", e => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listener for Guess Button
UIguessBtn.addEventListener("click", e => {
  let guess = parseInt(UIguessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Disable input and button
    UIguessInput.disabled = true;

    // Set Green border
    UIguessInput.style.borderColor = "green";
    UIguessBtn.style.borderColor = "green";

    //Set winning Message
    setMessage(`${winningNum} is correct! YOU WIN!`, "green");
    UIguessBtn.value = "Play again";
    UIguessBtn.className += "play-again";
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      setMessage(
        `Game over, you lost! The correct number was: ${winningNum}`,
        "red"
      );
      UIguessBtn.value = "Play again";
      UIguessBtn.className += "play-again";
      UIguessInput.disabled = true;
    } else {
      setMessage(
        `${guess} is not the right number. You have ${guessesLeft} remaining!`,
        "black"
      );
      UIguessInput.value = "";
    }
  }
});

// Set paragraph message
function setMessage(message, color) {
  UImessage.style.color = color;
  UImessage.textContent = message;
}

function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
