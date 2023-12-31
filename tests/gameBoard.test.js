import Gameboard from "../src/gameboard";

test("Place a single-space ship at a specified squre on gameboard", () => {
  const game = Gameboard();
  game.placeShip(0, 0, "scout", "horizontal");
  const shipAtPosition = game.getShipAt(0, 0);
  expect(shipAtPosition).toBeDefined();
});

test("Place a two-square horizontal ship at a specified location on the gameboard", () => {
  const game = Gameboard();
  game.placeShip(0, 0, "destroyer", "horizontal");
  expect(game.getShipAt(0, 0)).not.toBeNull();
  expect(game.getShipAt(1, 0)).not.toBeNull();
  expect(game.getShipAt(2, 0)).toBeNull();
});

test("Place a two-sqare vertical ship at a specified location on the gameboard", () => {
  const game = Gameboard();
  game.placeShip(0, 2, "destroyer", "vertical");
  expect(game.getShipAt(0, 2)).not.toBeNull();
  expect(game.getShipAt(0, 3)).not.toBeNull();
  expect(game.getShipAt(0, 1)).toBeNull();
});

test("GameBoard won't place ship if the space is occupied", () => {
  const game = Gameboard();
  game.placeShip(0, 2, "destroyer", "vertical");
  expect(() => {
    game.placeShip(0, 3, "submarine", "horizontal");
  }).toThrow("There is already a ship at that location.");
});

test("Gameboard can receive attack when there is a ship", () => {
  const game = Gameboard();
  game.placeShip(0, 0, "destroyer", "horizontal");
  game.receiveAttack(1, 0);
  const shipAtPosition = game.getShipAt(1, 0);
  expect(shipAtPosition.getHitNum()).toBe(1);
});

test("Gameboard keeps track of missed attacks", () => {
  const game = Gameboard();
  const missedAttack = { x: 0, y: 2 };
  game.placeShip(0, 0, "destroyer", "horizontal");
  game.receiveAttack(0, 2);
  expect(game.getMissedAttacks()).toEqual([missedAttack]);
});

test("Gameboard can check if every ship is sunk", () => {
  const game = Gameboard();
  game.placeShip(0, 0, "destroyer", "horizontal");
  game.placeShip(3, 0, "destroyer", "horizontal");
  game.receiveAttack(0, 0);
  game.receiveAttack(1, 0);
  game.receiveAttack(3, 0);
  game.receiveAttack(4, 0);
  expect(game.areAllShipsSunk()).toBe(true);
});
