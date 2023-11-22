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

    if (attackResult.hit) {
      attackResult.message = attackResult.sunk
        ? "AI sunk your ship!"
        : "AI hit your ship!";
    } else {
      attackResult.message = "AI missed!";
    }

    // eslint-disable-next-line consistent-return
    return attackResult;
  }

  getAttackArray() {
    return this.attackArray;
  }
}
export default AI;
