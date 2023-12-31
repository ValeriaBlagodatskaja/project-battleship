import Player from "../src/player";
import Gameboard from "../src/gameboard";

test("Player should have a name", () => {
  const player = new Player("Mari");
  expect(player.getName()).toBe("Mari");
});

test("Player can change name", () => {
  const player = new Player("Lucas");
  player.setName("Georg");
  expect(player.getName()).toBe("Georg");
});

test("Player ending turn starts enemy turn", () => {
  const player = new Player("Lucas");
  const ai = new Player("Georg");
  player.endTurn(ai);
  expect(player.checkTurn()).toBe(false);
  expect(ai.checkTurn()).toBe(true);
});

test("Player can attack enemy board if it's player's turn", () => {
  const aiBoard = Gameboard();
  const player = new Player("Lucas");
  const ai = new Player("Georg");
  aiBoard.placeShip(2, 0, "destroyer", "vertical");
  player.startTurn();
  player.attack(2, 0, ai, aiBoard);
  const attackedShip = aiBoard.getShipAt(2, 0);
  expect(attackedShip.getHitNum()).toBe(1);
});

test("Player attacking ends turn and starts enemy turn, player moves are recorded", () => {
  const aiBoard = Gameboard();
  const player = new Player("Lucas");
  const ai = new Player("Georg");
  aiBoard.placeShip(2, 0, "destroyer", "vertical");
  player.startTurn();
  player.attack(2, 0, ai, aiBoard);
  expect(player.getMoves().length).toBe(1);
  expect(player.checkTurn()).toBe(false);
  expect(ai.checkTurn()).toBe(true);
});
