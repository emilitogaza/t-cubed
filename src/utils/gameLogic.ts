export const WIN_CONDITIONS: Array<[number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkMiniWinner = (
  board: Array<string | null>
): "X" | "O" | null => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [x, y, z] = WIN_CONDITIONS[i];
    if (board[x] && board[x] === board[y] && board[y] === board[z]) {
      return board[x] as "X" | "O";
    }
  }
  return null;
};

export const checkBigWinner = (
  miniBoardStatus: Array<string | null>
): "X" | "O" | null => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [a, b, c] = WIN_CONDITIONS[i];
    if (
      miniBoardStatus[a] &&
      miniBoardStatus[a] === miniBoardStatus[b] &&
      miniBoardStatus[a] === miniBoardStatus[c]
    ) {
      console.log("Cubed Winner found:", miniBoardStatus[a]); // So I can see if a winner is actually declared
      return miniBoardStatus[a] as "X" | "O";
    }
  }
  return null;
};
