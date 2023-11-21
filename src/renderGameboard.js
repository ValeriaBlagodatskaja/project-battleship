import "./style.css";
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
      console.log("Attacking on board: ", aiBoard);
      const attackResult = player.attack(row, column, ai, aiBoard);

      if (attackResult.success) {
        if (attackResult.hit) {
          console.log(attackResult.message);
        } else {
          console.log("Missed");
        }

        if (!player.turn && ai.turn) {
          setTimeout(() => {
            ai.randomAttack(player, playerBoard);
            renderGameboard(playerBoard, "playerBoard");
            renderGameboard(aiBoard, "aiBoard");
          }, 500);
        }

        renderGameboard(playerBoard, "playerBoard");
        renderGameboard(aiBoard, "aiBoard");
      }
    }
  });
}

export { renderGameboard, setupEventListeners };
