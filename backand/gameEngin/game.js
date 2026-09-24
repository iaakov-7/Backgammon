import { createInitialBoard } from "./board.js";
import { rollingDice } from "./utils.js";
import { validateMove } from "./validations.js";

const gameState = {
  board: createInitialBoard(),
  currentPlayer: "white",
  dice: [],
  remainingDice: [],
  bar: { white: 0, black: 0 },
  borneOff: { white: 0, black: 0 },
  status: "waiting-for-roll",
  winner: null,
};

export function gameStart(gameState) {
  if (gameState.status !== "waiting-for-roll") {
    return { success: false, message: "status not equal to waiting-for-roll" };
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

function gameRoll(gameState) {
  const die1 = rollingDice();
  const die2 = rollingDice();
  gameState.dice = [die1, die2];
  gameState.remainingDice =
    die1 === die2 ? [die1, die1, die1, die1] : [die1, die2];
  gameState.status = "waiting-for-move";
}

export function gameMove(gameState, from, to, die) {
  const error = validateMove(gameState, from, to, die);
  if (error) {
    return {
      success: false,
      error,
    };
  }
  const currentPlayer = gameState.currentPlayer;
  const enemy = currentPlayer === "white" ? "black" : "white";
  if (from === "bar") {
    gameState.bar[currentPlayer]--;
  } else {
    gameState.board[from].checkers--;
    if (gameState.board[from].checkers === 0) {
      gameState.board[from].owner = null;
    }
  }
  if (to === "off") {
    gameState.borneOff[currentPlayer]++;
  } else {
    if (
      gameState.board[to].owner === enemy &&
      gameState.board[to].checkers === 1
    ) {
      gameState.bar[enemy]++;
      gameState.board[to].owner = currentPlayer;
    } else {
      gameState.board[to].owner = currentPlayer;
      gameState.board[to].checkers++;
    }
  }
  if (gameState.borneOff[currentPlayer] === 15) {
    gameState.status = "finished";
    return { success: true, message: `${currentPlayer} is the winer` };
  }
  const indexDie = gameState.remainingDice.indexOf(die);
  gameState.remainingDice.splice(indexDie, 1);
  if (gameState.remainingDice.length === 0) {
    endTurn(gameState);
  }
}
