import ship, { SHIP_LENGTHS } from "./ship";

const Gameboard = () => {
  const board = [];
  const ships = [];
  const BOARD_SIZE = 10;

  const shots = {
    hits: [],
    misses: [],
  };
  // Initialize the gameboard as a grid of null values
  const createBoard = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      board[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = null;
      }
    }
  };
  createBoard();

  // Place a ship on the gameboard
  const placeShip = (x, y, shipType, direction) => {
    const shipLength = SHIP_LENGTHS[shipType];

    const newShip = ship(shipType);
    ships.push(newShip);

    // Calculate the coordinates for the ship based on its length and direction
    for (let i = 0; i < shipLength; i++) {
      let currentX = x;
      let currentY = y;

      if (direction === "horizontal") {
        currentY += i;
      } else {
        currentX += i;
      }
      if (currentX >= BOARD_SIZE || currentY >= BOARD_SIZE) {
        throw new Error(
          "Ship placement is outside of the gameboard boundaries.",
        );
      }

      if (board[currentX][currentY]) {
        throw new Error("There is already a ship at that location.");
      }

      // Assign the ship to the board cell
      board[currentX][currentY] = newShip;
    }
  };

  const getShipAt = (x, y) => {
    if (board[x] === undefined || board[x][y] === undefined) {
      return null;
    }
    return board[x][y];
  };

  const receiveAttack = (x, y) => {
    const target = board[x][y];
    if (target) {
      target.hit();
      // Record the hit
      shots.hits.push({ x, y });
    } else {
      shots.misses.push({ x, y });
    }
  };

  const areAllShipsSunk = () => ships.every((ship) => ship.isSunk());
  const getMissedAttacks = () => shots.misses;

  return {
    placeShip,
    getShipAt,
    receiveAttack,
    areAllShipsSunk,
    getMissedAttacks,
    getShots: () => shots,
  };
};

export default Gameboard;
