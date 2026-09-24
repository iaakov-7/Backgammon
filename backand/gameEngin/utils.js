export function pointToIndex(point, color) {
  return color === "white" ? point - 1 : 24 - point;
}

export function calculateDestination(from, die, color) {
  return color === "white" ? from - die : from + die;
}

export function getBarDestination(die, color) {
  return color === "white" ? 24 - die : die - 1;
}

export function distanceToExit(index, color) {
  return color === "white" ? index + 1 : 24 - index;
}

export function rollingDice() {
  return Math.floor(Math.random() * 6 + 1);
}

export function checkHome(board, currentPlayer) {
  let isHome = true;
  if (currentPlayer === "white") {
    board.forEach((point, index) => {
      if (index > 5 && point.owner === "white" && point.checkers > 1) {
        isHome = false;
      }
    });
  }
  if (currentPlayer === "black") {
    board.forEach((point, index) => {
      if (index < 18 && point.owner === "black" && point.checkers > 1) {
        isHome = false;
      }
    });
  }
  return isHome;
}
