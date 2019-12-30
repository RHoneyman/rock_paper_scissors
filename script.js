const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const results = document.querySelector('#results');
const announce = document.querySelector('#announce');
const playerScoreDisplay = document.querySelector('#playerScore');
const computerScoreDisplay = document.querySelector('#computerScore');
let playerScore = 0, computerScore = 0;
const choices = document.querySelectorAll('.choice');
const playAgainButton = document.querySelector('#play');


function capitalize(string) {
  let letters = string.split("");
  letters[0] = letters[0].toUpperCase();
  for (let i = 1, n = string.length; i < n; i++) {
    letters[i] = letters[i].toLowerCase();
  }

  return letters.join("");
}

function isValid(selection) {
  if (selection === null) {
    return false;
  }

  selection = String(selection).toLowerCase();

  if (selection == 'rock' || selection == 'paper' || selection == 'scissors') {
    return true;
  } else {
    return false;
  }
}

function computerPlay() {
  let options = ["rock", "paper", "scissors"];
  return options[getRandomNum(3)];
}

function getRandomNum(x) {
  return Math.floor(Math.random() * x);
}

function playRound(playerSelection, computerSelection) {

  playerSelection = playerSelection.toLowerCase();

  if (playerSelection == computerSelection) {
    announce.textContent = `Tie! Both players chose ${capitalize(playerSelection)}`;
  } else if
    ((playerSelection == "rock" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "rock")) {
      announce.textContent = `You lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
      computerScore += 1;
      computerScoreDisplay.textContent = computerScore;
  } else if
    ((playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper") ||
    (playerSelection == "rock" && computerSelection == "scissors")) {
      announce.textContent = `You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
      playerScore += 1;
      playerScoreDisplay.textContent = playerScore;
  }

  if (playerScore == 5) {
    endGame('player');
  } else if (computerScore == 5) {
    endGame('computer');
  } 

}

function endGame(winner) {
  if (winner == 'player') {
    announce.textContent = "Congratulations! You win!";
  } else if (winner == 'computer') {
    announce.textContent = "Sorry, you lose!";
  } 

  choices.forEach( (choice) => {
    choice.disabled = true;
  });

  playAgainButton.style.visibility = 'visible';


}

function resetGame() {
  playerScore = 0;
  playerScoreDisplay.textContent = 0;
  computerScore = 0;
  computerScoreDisplay.textContent = 0;
  announce.textContent = 'MAKE YOUR CHOICE';
  playAgainButton.style.visibility = 'hidden';
  choices.forEach( (choice) => {
    choice.disabled = false;
  });
}

choices.forEach( (choice) => {
  choice.addEventListener('click', (e) => {
    playRound(e.target.id, computerPlay());
  });
});

playAgainButton.addEventListener('click', resetGame);
