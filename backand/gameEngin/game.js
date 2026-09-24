import { createInitialBoard } from "./board";
import { rollingDice } from "./utils";
import { validateMove } from "./validations";

const gameState = {
  board: createInitialBoard(),
  currentPlayer: "white",
  dice: [],
  remainingDice: [],
  bar: { white: 0, black: 0 },
  borneOff: { white: 0, black: 0 },
  status: "waiting-for-roll", // waiting-for-roll | waiting-for-move | finished
  winner: null,
};

function gameStart() {
  if (gameState.status !== "waiting-for-roll") {
    return { success: false, message: "stauts not equal to waiting-for-roll" };
  }
  let die1 = rollingDice();
  let die2 = rollingDice();
  while (die1 === die2) {
    die1 = rollingDice();
    die2 = rollingDice();
  }
  die1 > die2
    ? (gameState.currentPlayer = "white")
    : (gameState.currentPlayer = "black");
  gameState.dice = [die1, die2];
  gameState.remainingDice = [die1, die2];
  gameState.status = "waiting-for-move";
}

function gameRole() {
  const die1 = rollingDice();
  const die2 = rollingDice();
  gameState.dice = [die1, die2];
  gameState.remainingDice =
    die1 === die2 ? [die1, die1, die1, die1] : [die1, die2];
  gameState.status = "waiting-for-move";
}

function gameMove(from, to, die) {
  const error = validateMove(gameState);
  if (error) {
    return {
      success: false,
      error,
    };
  }
  if (from === "bar"){
    
  }
}
