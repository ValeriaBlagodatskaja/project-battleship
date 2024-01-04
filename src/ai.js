import Player from "./player";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

class AI extends Player {
  constructor(name, gameboard) {
    super(name, gameboard);
    this.turn = false;
    this.attackArray = [];
    this.lastHit = null;
    this.potentialTargets = [];
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomCoordinate() {
    const max = 10;
    const x = getRandomNumber(max);
    const y = getRandomNumber(max);
    return { x, y };
  }

  recordAttack(x, y) {
    this.attackArray.push({ x, y });
  }

  randomAttack(player, playerBoard) {
    if (!this.turn)
      return {
        success: false,
        hit: false,
        sunk: false,
        message: "",
      };

    let x;
    let y;

    if (this.potentialTargets.length > 0) {
      ({ x, y } = this.potentialTargets.pop());
    } else {
      do {
        ({ x, y } = this.getRandomCoordinate());
      } while (!this.isMoveLegal(x, y));
    }

    const attackResult = this.attack(x, y, player, playerBoard);

    if (attackResult.hit) {
      if (!attackResult.sunk) {
        this.updatePotentialTargets(x, y, playerBoard);
      } else {
        this.potentialTargets = [];
      }
      this.lastHit = { x, y };
    } else {
      this.lastHit = null;
    }

    const gameOver = playerBoard.areAllShipsSunk();

    if (gameOver) {
      attackResult.message = "Game over! AI won!";
    } else if (attackResult.hit) {
      attackResult.message = attackResult.sunk
        ? "AI sunk your ship!"
        : "AI hit your ship!";
    } else {
      attackResult.message = "AI missed!";
    }

    attackResult.allSunk = gameOver;

    this.recordAttack(x, y);
    this.endTurn(player);
    return attackResult;
  }

  updatePotentialTargets(x, y, playerBoard) {
    this.potentialTargets = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    this.potentialTargets = this.potentialTargets.filter((coord) =>
      this.isMoveLegal(coord.x, coord.y, playerBoard),
    );
  }

  getAttackArray() {
    return this.attackArray;
  }
}
export default AI;
