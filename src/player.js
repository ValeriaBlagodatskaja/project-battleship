/* eslint-disable no-param-reassign */
import Gameboard from "./gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = Gameboard();
    this.moves = [];
    this.turn = true;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  endTurn(enemyPlayer) {
    if (this.turn) {
      this.turn = false;
      enemyPlayer.turn = true;
    }
  }

  startTurn() {
    if (!this.turn) {
      this.turn = true;
    }
  }

  checkTurn() {
    return this.turn;
  }

  attack(x, y, enemyPlayer, enemyBoard) {
    if (!this.checkTurn()) {
      return { success: false, message: "It's not your turn" };
    }
    if (this.isMoveLegal(x, y)) {
      const attackResult = enemyBoard.receiveAttack(x, y);
      this.recordMove(x, y);
      this.endTurn(enemyPlayer);

      let gameOver = false;
      if (enemyBoard.areAllShipsSunk()) {
        gameOver = true;
      }

      if (attackResult.hit) {
        if (attackResult.sunk) {
          return {
            success: true,
            hit: true,
            sunk: true,
            allSunk: gameOver,
            message: gameOver ? "Game over! You won!" : "Ship sunk!",
          };
        }
        return { success: true, hit: true, sunk: false, message: "Ship hit!" };
      }
      return { success: true, hit: false, sunk: false, message: "Missed!" };
    }
    return { success: false, message: "You can't attack same spot twice" };
  }

  recordMove(x, y) {
    this.moves.push({ x, y });
  }

  getMoves() {
    return this.moves;
  }

  isMoveLegal(x, y) {
    const withinBounds = x >= 0 && y >= 0 && x < 10 && y < 10;
    const notPreviouslyAttacked = !this.moves.some(
      (move) => move.x === x && move.y === y,
    );
    return withinBounds && notPreviouslyAttacked;
  }
}

export default Player;
