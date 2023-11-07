import ship, { SHIP_LENGTHS } from './ship';

export const Gameboard = () => {
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
  const placeShip = (x, y, shipLength, direction) => {
    const newShip = ship(shipLength);
    ships.push(newShip);

    // Calculate the coordinates for the ship based on its length and direction
    for (let i = 0; i < shipLength; i++) {
      let currentX = x;
      let currentY = y;

      if (direction === 'horizontal') {
        currentY += i;
      } else {
        currentX += i;
      }
      if (currentX >= BOARD_SIZE || currentY >= BOARD_SIZE) {
        throw new Error(
          'Ship placement is outside of the gameboard boundaries.',
        );
      }

      if (board[currentX][currentY]) {
        throw new Error('There is already a ship at that location.');
      }

      // Assign the ship to the board cell
      board[currentX][currentY] = newShip;
    }
  };

  const hasShip = (x, y) => {
    if (board[x] === undefined || board[x][y] === undefined) {
      return false;
    }
    return board[x][y] !== null;
  }

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
    hasShip,
    receiveAttack,
    areAllShipsSunk,
    getMissedAttacks,
    getShots: () => shots,
  };
};
