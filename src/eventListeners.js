import { renderGameboard, updateMessage } from "./renderGameboard";

export default function setupEventListeners(playerBoard, aiBoard, player, ai) {
  const aiBoardElement = document.getElementById("aiBoard");

  aiBoardElement.addEventListener("click", (event) => {
    const cell = event.target;
    if (cell.classList.contains("board-cell")) {
      const row = parseInt(cell.getAttribute("data-row"), 10);
      const column = parseInt(cell.getAttribute("data-column"), 10);
      const attackResult = player.attack(row, column, ai, aiBoard);

      if (attackResult.success) {
        if (attackResult.hit) {
          updateMessage(attackResult.message);
          renderGameboard(playerBoard, "playerBoard");
          renderGameboard(aiBoard, "aiBoard");
          if (attackResult.allSunk) {
            updateMessage(attackResult.message);

            const restartBtn = document.getElementById("restartBtn");
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
                const restartBtn = document.getElementById("restartBtn");
                restartBtn.style.display = "block";
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
