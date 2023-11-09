import AI from "../src/ai";
import Gameboard from "../src/gameboard";
import Player from "../src/player";

test("AI has a name and start game with turn false", () => {
  const ai = new AI("computer");
  expect(ai.getName()).toBe("computer");
  expect(ai.checkTurn()).toBe(false);
});

test("AI attacks then it's their turn", () => {
  const ai = new AI("computer");
  const player = new Player("Lucas");
  const playerBoard = Gameboard();
  playerBoard.placeShip(2, 0, "destroyer", "vertical");

  // Spy on getRandomCoordinate to control where the AI will attack
  jest.spyOn(ai, "getRandomCoordinate").mockReturnValue({ x: 2, y: 0 });

  // Start the AI's turn
  ai.startTurn();
  // AI performs a random attack
  ai.randomAttack(player, playerBoard);

  // Verify the getRandomCoordinate function was called
  expect(ai.getRandomCoordinate).toHaveBeenCalled();

  // Verify that the AI has attacked the specified coordinates
  const attackedShip = playerBoard.getShipAt(2, 0);
  expect(attackedShip.getHitNum()).toBe(1);

  // Verify that a move has been recorded
  expect(ai.attackArray).toContainEqual({ x: 2, y: 0 });

  // Check if AI's turn is over after the attack (assuming it should end)
  // This part of the test would fail if the turn isn't meant to end automatically,
  // you'll need to modify it based on the actual game rules.
  expect(ai.checkTurn()).toBe(false);

  // Cleanup the spy
  ai.getRandomCoordinate.mockRestore();
});

test("AI records all attacks and only attack when it has turn", () => {
  const aiBoard = Gameboard();
  const player = new Player("Lucas");
  const playerBoard = Gameboard();
  const ai = new AI("computer");
  player.attack(3, 0, ai, aiBoard);
  ai.startTurn();
  ai.randomAttack(player, playerBoard);
  expect(ai.checkTurn()).toBe(false);
  ai.randomAttack(player, playerBoard);
  expect(ai.getAttackArray().length).toBe(1);
});
