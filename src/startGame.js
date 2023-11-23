import Gameboard from "./gameboard";
import ship from "./ship";
import Player from "./player";
import AI from "./ai";
import "./style.css";

import { renderGameboard, updateMessage } from "./renderGameboard";

import setupEventListeners from "./eventListeners";

export default function startGame() {
  const playerBoard = Gameboard();
  playerBoard.placeShip(0, 2, "destroyer", "vertical");
  playerBoard.placeShip(5, 5, "carrier", "vertical");
  playerBoard.placeShip(8, 4, "battleship", "vertical");
  playerBoard.placeShip(2, 8, "destroyer", "vertical");
  const aiBoard = Gameboard();
  aiBoard.placeShip(3, 2, "destroyer", "horizontal");
  aiBoard.placeShip(9, 7, "destroyer", "vertical");

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
