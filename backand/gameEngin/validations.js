import { calculateDestination, checkHome, getBarDestination } from "./utils.js";

export function validateMove(gameState, from, to, die) {
  if (gameState.status !== "waiting-for-move")
    return "Stauts not equal to waiting-for-move";

  if (!gameState.remainingDice.includes(die))
    return "Die is not in remining dice";

  const currentPlayer = gameState.currentPlayer;
  const enemy = currentPlayer === "white" ? "black" : "white";

  const hasCheckersOnBar = gameState.bar[currentPlayer] > 0;
  if (from === "bar") {
    if (!hasCheckersOnBar) return "There are no checkers on bar";
    if (getBarDestination(die, currentPlayer) !== to)
      return "Destination not valid";
  } else {
    if (from < 0 || from > 23) {
      return "Invalid source index";
    }
    if (hasCheckersOnBar)
      return "You can no move if you have checkers on the bar";

    if (gameState.board[from].owner !== gameState.currentPlayer)
      return "Player is not owner of from point";

    if (gameState.board[from].checkers < 1)
      return "You dont have checkers on from point";
  }
  if (to === "off") {
    const isEvreyoneHome = checkHome(gameState.board, currentPlayer);
    if (!isEvreyoneHome) return "Not all the checkers are in home";
  } else {
    if (calculateDestination(from, die, currentPlayer) !== to)
      return "To index is not valid";

    if (
      gameState.board[to].owner === enemy &&
      gameState.board[to].checkers >= 2
    )
      return "The destination is blocking by the enemy";
  }
}
