import { test, describe } from "node:test";
import assert from "node:assert";
import { gameStart, gameMove } from "../gameEngin/game.js";
import { createInitialBoard } from "../gameEngin/board.js";

describe("game tests", () => {
  describe("game start tests", () => {
    test("should start a game", () => {
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
      gameStart(gameState);
      assert.strictEqual(gameState.dice.length, 2);
      assert.strictEqual(
        gameState.dice.every((d) => [1, 2, 3, 4, 5, 6].includes(d)),
        true,
      );
      assert.strictEqual(gameState.status, "waiting-for-move");
    });
    test("should return error", () => {
      const gameState = {
        board: createInitialBoard(),
        currentPlayer: "white",
        dice: [],
        remainingDice: [],
        bar: { white: 0, black: 0 },
        borneOff: { white: 0, black: 0 },
        status: "waiting-for-move",
        winner: null,
      };
      assert.deepStrictEqual(gameStart(gameState), {
        success: false,
        message: "status not equal to waiting-for-roll",
      });
    });
  });
  describe("game move tests", () => {
    test("should move", () => {
      const gameState = {
        board: createInitialBoard(),
        currentPlayer: "white",
        dice: [5, 4],
        remainingDice: [5, 4],
        bar: { white: 0, black: 0 },
        borneOff: { white: 0, black: 0 },
        status: "waiting-for-move",
        winner: null,
      };
      const result = gameMove(gameState, 23, 19, 4);
      assert.deepStrictEqual(gameState.board[23].checkers, 1);
      assert.deepStrictEqual(gameState.board[19].checkers, 1);
      assert.deepStrictEqual(gameState.board[19].owner, "white");
    });
    test("should return error", () => {
      const gameState = {
        board: createInitialBoard(),
        currentPlayer: "white",
        dice: [5, 4],
        remainingDice: [5, 4],
        bar: { white: 0, black: 0 },
        borneOff: { white: 0, black: 0 },
        status: "waiting-for-move",
        winner: null,
      };
      assert.deepStrictEqual(gameMove(gameState, 23, 19, 6), {
        success: false,
        error: "Die is not in remining dice",
      });
    });
  });
});
