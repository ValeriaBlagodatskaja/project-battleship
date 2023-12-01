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

  try {
    if (maxColumn > 9 || maxRow > 9) return;
    playerBoard.placeShip(row, column, selectedShip, currentDirection);
    placedShips.add(selectedShip);
    renderGameboard(playerBoard, "playerBoard");
  } catch (error) {
    console.log(error);
    updateMessage("There is already a ship at that location.");
  } finally {
    selectedShip = null;
    clearHighlights();
  }
}
