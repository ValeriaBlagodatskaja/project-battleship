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

  setName(name) {
    this.name = name;
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
      enemyBoard.receiveAttack(x, y);
      this.recordMove(x, y);
      this.endTurn(enemyPlayer);
      return { success: true, message: "Attack made" };
    }
    return { success: false, message: "You can't attack same spot twice" };
  }

  recordMove(x, y) {
    this.moves.push({ x, y });
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
