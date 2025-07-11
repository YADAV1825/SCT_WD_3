let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const statusDisplay = document.getElementById("status");
const boardContainer = document.getElementById("board");
const xProb = document.getElementById("xProb");
const oProb = document.getElementById("oProb");

function drawBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    if (cell) div.classList.add(cell.toLowerCase());
    div.textContent = cell;
    div.addEventListener("click", () => makeMove(index));
    boardContainer.appendChild(div);
  });
}

function makeMove(index) {
  if (gameOver || board[index] !== "") return;
  board[index] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateUI();
}

function updateUI() {
  drawBoard();
  const winner = checkWinner();
  if (winner) {
    statusDisplay.textContent = `${winner} wins!`;
    gameOver = true;
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "It's a draw!";
    gameOver = true;
  } else {
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  }
  updateProbabilities();
}

function updateProbabilities() {
    const xCount = board.filter(cell => cell === "X").length;
    const oCount = board.filter(cell => cell === "O").length;
    const empty = board.filter(cell => cell === "").length;
  
    let xAdvantage = xCount - oCount;
    let xProbValue = 50 + (xAdvantage * 10);
  
    // Clamp between 0 and 100
    xProbValue = Math.max(0, Math.min(100, xProbValue));
    const oProbValue = 100 - xProbValue;
  
    xProb.style.width = `${xProbValue}%`;
    oProb.style.width = `${oProbValue}%`;
  }
  

function checkWinner() {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      highlightWin(a,b,c);
      return board[a];
    }
  }
  return null;
}

function highlightWin(a, b, c) {
  const cells = document.querySelectorAll(".cell");
  [a, b, c].forEach(i => {
    cells[i].style.background = "lime";
    cells[i].style.boxShadow = "0 0 20px lime";
    cells[i].style.transform = "scale(1.2)";
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusDisplay.textContent = "Player X's Turn";
  updateUI();
  updateProbabilities(); // 💥 Reset probability too

}

// Initialize
drawBoard();
updateProbabilities();
