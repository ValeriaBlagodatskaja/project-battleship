import { SHIP_LENGTHS } from "./ship";
import "./style.css";
import { renderGameboard, updateMessage } from "./renderGameboard";

let selectedShip = null;
const placedShips = new Set();
let currentDirection = "horizontal";

export function selectShip(event) {
  const shipElement = event.target.closest("[data-ship-type]");
  if (shipElement) {
    const shipType = shipElement.getAttribute("data-ship-type");

    if (placedShips.has(shipType)) {
      updateMessage(`${shipType} is already placed`);
      return;
    }
    selectedShip = shipType;
    updateMessage(`Selected ship: ${selectedShip}`);
  }
}

export function toggleShipDirection() {
  currentDirection =
    currentDirection === "horizontal" ? "vertical" : "horizontal";
  updateMessage(`Current direction: ${currentDirection}`);
}

export function clearHighlights() {
  document.querySelectorAll(".highlight").forEach((cell) => {
    cell.classList.remove("highlight");
  });
}

function highlightCell(row, column) {
  if (!selectedShip) return;

  const targetCell = document.querySelector(
    `[data-row="${row}"][data-column="${column}"]`,
  );
  if (targetCell) {
    targetCell.classList.add("highlight");
  }
}

export function handleMouseOver(event) {
  if (!selectedShip) return;

  const cell = event.target;
  if (!cell.classList.contains("board-cell")) return;

  const shipLength = SHIP_LENGTHS[selectedShip];
  const row = parseInt(cell.getAttribute("data-row"), 10);
  const column = parseInt(cell.getAttribute("data-column"), 10);

  clearHighlights();

  if (currentDirection === "horizontal") {
    const maxColumn = Math.min(column + shipLength, 10);
    for (let i = column; i < maxColumn; i++) {
      highlightCell(row, i);
    }
  } else {
    const maxRow = Math.min(row + shipLength, 10);
    for (let i = row; i < maxRow; i++) {
      highlightCell(i, column);
    }
  }
}

export function placeShipOnClick(event, playerBoard) {
  if (!selectedShip) return;

  const cell = event.target;
  if (!cell.classList.contains("board-cell")) return;

  const row = parseInt(cell.getAttribute("data-row"), 10);
  const column = parseInt(cell.getAttribute("data-column"), 10);

  const shipLength = SHIP_LENGTHS[selectedShip];

  let maxRow = row;
  let maxColumn = column;

  if (currentDirection === "horizontal") {
    maxColumn = Math.min(column + shipLength, 10);
  } else {
    maxRow = Math.min(row + shipLength, 10);
  }

  if (placedShips.has(selectedShip)) {
    updateMessage(`${selectedShip} is already placed`);
    clearHighlights();
    return;
  }

  if (maxColumn > 10 || maxRow > 10) {
    updateMessage("Ship doesn't fit on board");
    clearHighlights();
    return;
  }

  if (!playerBoard.canPlaceShip(row, column, selectedShip, currentDirection)) {
    updateMessage("Cannot place ship here");
    clearHighlights();
    return;
  }

  try {
    playerBoard.placeShip(row, column, selectedShip, currentDirection);
    placedShips.add(selectedShip);
    renderGameboard(playerBoard, "playerBoard");

    if (placedShips.size === Object.keys(SHIP_LENGTHS).length) {
      document.getElementById("startGameBtn").style.display = "block";
    }
    selectedShip = null;
    clearHighlights();
  } catch (error) {
    console.log(error);
    updateMessage(error.message);
  } finally {
    selectedShip = null;
    clearHighlights();
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function placeAIShips(aiBoard, shipLengths) {
  const placedAIShips = [];

  Object.keys(shipLengths).forEach((shipType) => {
    let placed = false;
    while (!placed) {
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
      const shipLength = shipLengths[shipType];

      const maxX = direction === "vertical" ? 9 - shipLength : 9;
      const maxY = direction === "horizontal" ? 9 - shipLength : 9;

      const x = getRandomInt(0, maxX);
      const y = getRandomInt(0, maxY);
      console.log(aiBoard.canPlaceShip(x, y, shipType, direction));
      if (!aiBoard.canPlaceShip(x, y, shipType, direction)) {
        console.log("Cannot place ship here", x, y, shipType, direction);
        placed = false;
        continue;
      } else {
        const shipInfo = aiBoard.placeShip(x, y, shipType, direction);
        placedAIShips.push(shipInfo);
        placed = true;
      }
    }
  });
  console.log(placedAIShips);
  return placedAIShips;
}
