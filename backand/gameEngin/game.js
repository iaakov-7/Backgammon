import { createInitialBoard } from "./board";

const gameSiuation = {
  board: createInitialBoard(),
  currentPlayer: "white",
  dice: [],
  remainingDice: [],
  bar: { white: 0, black: 0 },
  borneOff: { white: 0, black: 0 },
  status: "waiting-for-roll", // waiting-for-roll | waiting-for-move | finished
  winner: null,
};
