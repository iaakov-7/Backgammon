import { pointToIndex } from "./utils.js";

function createEmptyBoard() {
  return Array(24)
    .fill(null)
    .map(() => ({ owner: null, checkers: 0 }));
}

export function createInitialBoard() {
  const board = createEmptyBoard();
  const opening_layout = [
    { point: 24, checkers: 2 },
    { point: 13, checkers: 5 },
    { point: 8, checkers: 3 },
    { point: 6, checkers: 5 },
  ];
  opening_layout.forEach((l) => {
    const index = pointToIndex(l.point, "white");
    board[index].checkers = l.checkers;
    board[index].owner = "white";
  });
  opening_layout.forEach((l) => {
    const index = pointToIndex(l.point, "black");
    board[index].checkers = l.checkers;
    board[index].owner = "black";
  });
  return board;
}
