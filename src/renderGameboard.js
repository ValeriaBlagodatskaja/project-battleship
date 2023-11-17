/* eslint-disable no-console */
function renderGameboard(gameboard, boardContainerId) {
  const boardData = gameboard.getBoard();
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

      // Check if the cell has a ship
      if (cell && cell.id) {
        cellDiv.classList.add("ship");
      }
      // Check if the cell is hit
      else if (cell && cell.isHit) {
        cellDiv.classList.add("hit");
      }
      // Check if the cell is a miss
      else if (cell === "miss") {
        cellDiv.classList.add("miss");
      }

      // Set attributes for identification
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
        console.log(attackResult.message);

        if (!player.turn && ai.turn) {
          setTimeout(() => {
            ai.randomAttack(player, playerBoard);
            console.log("ai makes move");
            renderGameboard(playerBoard, "playerBoard");
            renderGameboard(aiBoard, "aiBoard");
          }, 500);
        }
      } else {
        console.log("Attack failed:", attackResult.message);
      }
    }
  });
}

export { renderGameboard, setupEventListeners };
