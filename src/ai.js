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
    this.attack(x, y, player, playerBoard);
    this.recordAttack(x, y);
    this.endTurn(player);
  }

  getAttackArray() {
    return this.attackArray;
  }
}
export default AI;
