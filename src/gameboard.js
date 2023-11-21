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

  const getBoard = () => {
    return board.map((row) => [...row]);
  };

  // Place a ship on the gameboard
  const placeShip = (x, y, shipType, direction) => {
    const shipLength = SHIP_LENGTHS[shipType];

    const newShip = ship(shipType);
    ships.push(newShip);

    // Calculate the coordinates for the ship based on its length and direction
    for (let i = 0; i < shipLength; i++) {
      let startX = x;
      let startY = y;

      if (direction === "horizontal") {
        startX += i;
      } else {
        startY += i;
      }
      if (startX >= BOARD_SIZE || startY >= BOARD_SIZE) {
        throw new Error(
          "Ship placement is outside of the gameboard boundaries.",
        );
      }

      if (board[startX][startY]) {
        throw new Error("There is already a ship at that location.");
      }

      // Assign the ship to the board cell
      board[startX][startY] = newShip;
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
      if (target.isSunk()) {
        return { hit: true, sunk: true };
      }
      return { hit: true, sunk: false };
    }

    shots.misses.push({ x, y });
    return { hit: false, sunk: false };
  };

  // eslint-disable-next-line no-shadow
  const areAllShipsSunk = () => ships.every((ship) => ship.isSunk());
  const getMissedAttacks = () => shots.misses;
  const getShots = () => shots;

  return {
    placeShip,
    getShipAt,
    receiveAttack,
    areAllShipsSunk,
    getMissedAttacks,
    getBoard,
    getShots,
  };
};

export default Gameboard;
