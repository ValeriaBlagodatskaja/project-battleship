import Gameboard from "./gameboard";
import Player from "./player";
import AI from "./ai";
import "./style.css";
import { renderGameboard, updateMessage } from "./renderGameboard";
import setupEventListeners from "./eventListeners";
import {
  selectShip,
  toggleShipDirection,
  clearHighlights,
  handleMouseOver,
  placeShipOnClick,
} from "./placingShips";

export default function startGame() {
  const playerBoard = Gameboard();
  const playerBoardElement = document.getElementById("playerBoard");

  playerBoardElement.addEventListener("mouseover", handleMouseOver);
  playerBoardElement.addEventListener("mouseleave", clearHighlights);
  playerBoardElement.addEventListener("click", (e) =>
    placeShipOnClick(e, playerBoard),
  );

  document
    .getElementById("directionBtn")
    .addEventListener("click", toggleShipDirection);

  document.querySelectorAll(".ship").forEach((shipChoice) => {
    shipChoice.addEventListener("click", selectShip);
  });

  const aiBoard = Gameboard();
  aiBoard.placeShip(3, 2, "destroyer", "horizontal");
  aiBoard.placeShip(7, 7, "destroyer", "vertical");

  const player = new Player("Player Name", playerBoard);
  const ai = new AI("AI", aiBoard);

  // Render the initial state of the gameboard
  renderGameboard(playerBoard, "playerBoard");
  renderGameboard(aiBoard, "aiBoard");

  // Setup event listeners for the gameboard
  setupEventListeners(playerBoard, aiBoard, player, ai);
}

const restartBtn = document.getElementById("restartBtn");

export function resetGame() {
  restartBtn.style.display = "none";
  updateMessage("Launch an attack!");
  startGame();
}

restartBtn.addEventListener("click", resetGame);
