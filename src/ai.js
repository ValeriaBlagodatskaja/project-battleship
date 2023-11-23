import Player from "./player";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

class AI extends Player {
  constructor(name, gameboard) {
    super(name, gameboard);
    this.turn = false;
    this.attackArray = [];
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
    if (!this.turn) return;

    let x;
    let y;
    do {
      ({ x, y } = this.getRandomCoordinate());
    } while (!this.isMoveLegal(x, y));
    const attackResult = this.attack(x, y, player, playerBoard);
    console.log("AI attack result:", attackResult, x, y);

    this.recordAttack(x, y);
    this.endTurn(player);

    const gameOver = playerBoard.areAllShipsSunk();

    // Update the message based on attack result
    if (gameOver) {
      // If all ships are sunk, the game is over
      attackResult.message = "Game over! AI won!";
    } else if (attackResult.hit) {
      // If a ship is hit, but not all are sunk
      attackResult.message = attackResult.sunk
        ? "AI sunk your ship!"
        : "AI hit your ship!";
    } else {
      // If the attack missed
      attackResult.message = "AI missed!";
    }

    attackResult.allSunk = gameOver;

    return attackResult;
  }

  getAttackArray() {
    return this.attackArray;
  }
}
export default AI;
