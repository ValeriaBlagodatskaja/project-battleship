// length object
export const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

const ship = (shipType) => {
  const id = shipType;
  const length = SHIP_LENGTHS[shipType];
  let direction = "horizontal";

  let hits = 0;

  // hit
  const hit = () => {
    if (hits < length) {
      // You can hit a ship only if it hasn't been sunk
      hits++;
    }
  };

  const getHitNum = () => hits;
  // isSunk
  const isSunk = () => {
    if (hits >= length) {
      return true;
    }
    return false;
  };

  const getDirection = () => direction;
  const changeDirection = () => {
    direction = direction === "horizontal" ? "vertical" : "horizontal";
  };

  return {
    id,
    length,
    hit,
    getHitNum,
    isSunk,
    getDirection,
    changeDirection,
  };
};

export default ship;
