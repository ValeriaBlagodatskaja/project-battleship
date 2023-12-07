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
      console.log("Random attack at:", x, y);
    }

    const attackResult = this.attack(x, y, player, playerBoard);

    if (attackResult.hit) {
      // If a ship is hit but not sunk, update potential targets
      if (!attackResult.sunk) {
        this.updatePotentialTargets(x, y, playerBoard);
        // Clear potential targets if a ship is sunk
      } else {
        this.potentialTargets = [];
      }
      // Clear last hit if the AI missed, indicating no ship in the nearby area
      this.lastHit = { x, y };
    } else {
      this.lastHit = null;
    }

    const gameOver = playerBoard.areAllShipsSunk();

    // Update the message based on attack result
    if (gameOver) {
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
    console.log("Generated Potential Targets:", this.potentialTargets);

    // Filter out illegal coordinates
    this.potentialTargets = this.potentialTargets.filter((coord) =>
      this.isMoveLegal(coord.x, coord.y, playerBoard),
    );

    console.log("Filtered Potential Targets:", this.potentialTargets);
  }

  getAttackArray() {
    return this.attackArray;
  }
}
export default AI;
