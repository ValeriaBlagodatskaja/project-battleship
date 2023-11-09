import Player from "./player";

class AI extends Player {
  constructor(name, gameboard) {
    super(name, gameboard);
    this.turn = false;
    this.attackArray = [];
  }

  getRandomCoordinate() {
    const max = 10;
    const x = Math.floor(Math.random() * max);
    const y = Math.floor(Math.random() * max);
    return { x, y };
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
    this.endTurn();
  }

  recordAttack(x, y) {
    this.attackArray.push({ x, y });
  }

  getAttackArray() {
    return this.attackArray;
  }
}
export default AI;
