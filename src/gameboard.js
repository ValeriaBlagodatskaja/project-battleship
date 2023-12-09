import ship, { SHIP_LENGTHS } from "./ship";

const Gameboard = () => {
  const board = [];
  const ships = [];
  const BOARD_SIZE = 10;

  const shots = {
    hits: [],
    misses: [],
  };

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

  const placeShip = (x, y, shipType, direction) => {
    const shipLength = SHIP_LENGTHS[shipType];

    const newShip = ship(shipType);
    ships.push(newShip);

    for (let i = 0; i < shipLength; i++) {
      let startX = x;
      let startY = y;

      if (direction === "vertical") {
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

      board[startX][startY] = newShip;
    }
  };

  const canPlaceShip = (x, y, shipType, direction) => {
    const shipLength = SHIP_LENGTHS[shipType];

    for (let i = 0; i < shipLength; i++) {
      let checkX = x;
      let checkY = y;

      if (direction === "vertical") {
        checkX += i;
      } else {
        checkY += i;
      }

      if (
        checkX >= BOARD_SIZE ||
        checkY >= BOARD_SIZE ||
        board[checkX][checkY]
      ) {
        return false;
      }
    }

    return true;
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
    canPlaceShip,
    getShipAt,
    receiveAttack,
    areAllShipsSunk,
    getMissedAttacks,
    getBoard,
    getShots,
  };
};

export default Gameboard;
