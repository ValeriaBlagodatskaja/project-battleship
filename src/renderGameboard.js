import "./style.css";

/* eslint-disable no-console */
export function renderGameboard(gameboard, boardContainerId) {
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

export function updateMessage(message) {
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = message;
  } else {
    console.error("Message element not found");
  }
}
