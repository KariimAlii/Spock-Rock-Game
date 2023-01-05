//===================Selectors=====================//

const playerScoreEl = document.getElementById("playerScore");
const playerChoiceEl = document.getElementById("playerChoice");

const computerScoreEl = document.getElementById("computerScore");
const computerChoiceEl = document.getElementById("computerChoice");

let playerChoice;
let computerChoice;

const resultText = document.getElementById("resultText");

const allGameIcons = document.querySelectorAll(".choiceIcon");
const playerIcons = document.querySelectorAll("#player .choiceIcon");
const computerIcons = document.querySelectorAll("#computer .choiceIcon");

const resetIcon = document.getElementById("resetIcon");
//===================Choices=====================//
const choices = [
    { name: "Rock", defeats: ["Scissors", "Lizard"] },
    { name: "Paper", defeats: ["Rock", "Spock"] },
    { name: "Scissors", defeats: ["Paper", "Lizard"] },
    { name: "Lizard", defeats: ["Paper", "Spock"] },
    { name: "Spock", defeats: ["Scissors", "Rock"] },
];
//===================Reset Selected Function=====================//
function resetSelected() {
    // for (let gameIcon of allGameIcons) gameIcon.classList.remove("selected");
    allGameIcons.forEach((gameIcon) => {
        gameIcon.classList.remove("selected");
    });
}
//===================Reset Scores=====================//
function resetScores() {
    playerScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
}
//===================Reset Choice=====================//
function resetChoice() {
    playerChoiceEl.textContent = "";
    computerChoiceEl.textContent = "";
}
//===================Reset Result=====================//
function resetResult() {
    resultText.textContent = "";
}
//===================ComputerSelect Function=====================//
function computerSelect() {
    const index = Math.floor(Math.random() * (computerIcons.length - 1)); // random index from 0 to 4
    computerIcons[index].classList.add("selected");
    computerChoice = computerIcons[index].getAttribute("title");
    computerChoiceEl.textContent = " --- " + computerChoice;
}
//===================Win or Lose Function=====================//
function winOrLose(playerChoice) {
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].name === playerChoice) {
            if (choices[i].defeats.includes(computerChoice)) { // win
                const newScore = parseInt(playerScoreEl.textContent) + 1;
                playerScoreEl.textContent = newScore;
                resultText.textContent = "You Won!";
                resultText.classList.remove("lose");
                resultText.classList.add("win");
                startConfetti();
            } else { // lose
                stopConfetti();
                const newScore = parseInt(computerScoreEl.textContent) + 1;
                computerScoreEl.textContent = newScore;
                resultText.textContent = "You Lose!";
                resultText.classList.remove("win");
                resultText.classList.add("lose");
            }
            break;
        }
    }
}
//===================PlayerSelect Function=====================//
// Passing player selection value and styling icons
function playerSelect(playerChoice) {
    resetSelected();
    let requiredIndex;
    for (let i = 0; i < playerIcons.length; i++) {
        if (playerIcons[i].getAttribute("title") === playerChoice) {
            requiredIndex = i;
            break;
        }
    }
    playerIcons[requiredIndex].classList.add("selected");
    playerChoice = playerIcons[requiredIndex].getAttribute("title");
    playerChoiceEl.textContent = " --- " + playerChoice;
    computerSelect();
    winOrLose(playerChoice);

}
resetIcon.addEventListener("click", () => {
    resetSelected();
    resetScores();
    resetChoice();
    resetResult();
    stopConfetti();
});
