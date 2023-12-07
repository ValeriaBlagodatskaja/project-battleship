import Gameboard from "./gameboard";
import Player from "./player";
import AI from "./ai";
import "./style.css";
import { SHIP_LENGTHS } from "./ship";
import { renderGameboard, updateMessage } from "./renderGameboard";
import setupEventListeners from "./eventListeners";
import {
  selectShip,
  toggleShipDirection,
  clearHighlights,
  handleMouseOver,
  placeShipOnClick,
  placeAIShips,
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

  document.querySelectorAll(".ship").forEach((shipElement) => {
    shipElement.addEventListener("click", selectShip);
  });

  renderGameboard(playerBoard, "playerBoard");

  function initializeAIBoard() {
    const aiBoard = Gameboard();
    placeAIShips(aiBoard, SHIP_LENGTHS);

    const aiBoardElement = document.getElementById("aiBoard-container");
    aiBoardElement.style.display = "block";

    updateMessage("Launch an attack!");
    renderGameboard(aiBoard, "aiBoard");
    const player = new Player("Player Name", playerBoard);
    const ai = new AI("AI", aiBoard);
    setupEventListeners(playerBoard, aiBoard, player, ai);
  }

  document.getElementById("startGameBtn").addEventListener("click", () => {
    initializeAIBoard();
    document.getElementById("startGameBtn").style.display = "none";
    document.getElementById("directionBtn").style.display = "none";
    document.getElementById("ships").style.display = "none";
  });
}

const restartBtn = document.getElementById("restartBtn");

export function resetGame() {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}

restartBtn.addEventListener("click", resetGame);
