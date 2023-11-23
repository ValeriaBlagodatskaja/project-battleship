import "./style.css";
import startGame from "./startGame";

/* eslint-disable no-console */
function renderGameboard(gameboard, boardContainerId) {
  const boardData = gameboard.getBoard();
  const shots = gameboard.getShots();
  const { hits, misses } = shots;
  const boardContainer = document.getElementById(boardContainerId);

  // Clear previous content
  boardContainer.innerHTML = "";

  // Create and append rows and cells
  boardData.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "board-row";

    row.forEach((cell, cellIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "board-cell";

      if (cell && typeof cell === "object" && cell.id) {
        cellDiv.classList.add("ship");
      }
      // Set attributes for identification
      hits.forEach(({ x, y }) => {
        if (x === rowIndex && y === cellIndex) {
          cellDiv.classList.add("hit");
        }
      });

      misses.forEach(({ x, y }) => {
        if (x === rowIndex && y === cellIndex) {
          cellDiv.classList.add("miss");
        }
      });

      cellDiv.setAttribute("data-row", rowIndex);
      cellDiv.setAttribute("data-column", cellIndex);

      rowDiv.appendChild(cellDiv);
    });

    boardContainer.appendChild(rowDiv);
  });
}

function updateMessage(text) {
  console.log("Updating message to:", text); // Debugging line
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = text;
  } else {
    console.error("Message element not found"); // Debugging line
  }
}

const restartBtn = document.getElementById("restartBtn");

function resetGame() {
  restartBtn.style.display = "none";
  updateMessage("Launch an attack!");
  startGame();
}

restartBtn.addEventListener("click", resetGame);

function setupEventListeners(playerBoard, aiBoard, player, ai) {
  const aiBoardContainer = document.getElementById("aiBoard");

  aiBoardContainer.addEventListener("click", (event) => {
    console.log("Clicked on AI board");
    const cell = event.target;
    if (cell.classList.contains("board-cell")) {
      // Get the row and column from the cell's data attributes
      const row = parseInt(cell.getAttribute("data-row"), 10);
      const column = parseInt(cell.getAttribute("data-column"), 10);
      // Perform an attack or other game logic based on the clicked cell
      const attackResult = player.attack(row, column, ai, aiBoard);

      if (attackResult.success) {
        if (attackResult.hit) {
          updateMessage(attackResult.message);
          renderGameboard(playerBoard, "playerBoard");
          renderGameboard(aiBoard, "aiBoard");
          if (attackResult.allSunk) {
            updateMessage(attackResult.message);

            restartBtn.style.display = "block";
            return;
          }
        } else {
          updateMessage(attackResult.message);
        }

        if (!player.turn && ai.turn) {
          setTimeout(() => {
            const aiAttackResult = ai.randomAttack(player, playerBoard);
            if (aiAttackResult.success) {
              updateMessage(aiAttackResult.message);
              if (aiAttackResult.allSunk) {
                updateMessage(aiAttackResult.message);
                return;
              }
            }
            renderGameboard(playerBoard, "playerBoard");
            renderGameboard(aiBoard, "aiBoard");
          }, 1000);
        }

        renderGameboard(playerBoard, "playerBoard");
        renderGameboard(aiBoard, "aiBoard");
      }
    }
  });
}

export { renderGameboard, setupEventListeners };
