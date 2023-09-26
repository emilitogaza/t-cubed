// useGame.ts
import { useState, useEffect } from "react";
import { checkMiniWinner, checkBigWinner } from "./gameLogic";

export const useGame = () => {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(null)));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [activeMiniBoard, setActiveMiniBoard] = useState<number | null>(null);
  const [lastBoxIdx, setLastBoxIdx] = useState<number | null>(null);
  const [startingPlayer, setStartingPlayer] = useState(true);
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const [miniBoardStatus, setMiniBoardStatus] = useState<
    Array<"X" | "O" | null>
  >(Array(9).fill(null));

  // Effects
  useEffect(() => {
    if (lastBoxIdx !== null && miniBoardStatus[lastBoxIdx] === null) {
      setActiveMiniBoard(lastBoxIdx);
    } else {
      setActiveMiniBoard(null);
    }
  }, [miniBoardStatus, lastBoxIdx]);

  // Logic for clicking on a box: don't allow click if mini board is won, and don't allow click if the game is over or is already clicked
  const handleBoxClick = (boardIdx: number, boxIdx: number) => {
    if (
      miniBoardStatus[boardIdx] !== null ||
      gameOver ||
      (activeMiniBoard !== null && boardIdx !== activeMiniBoard)
    )
      return;

    // Don't allow click if the box in the mini-board is already filled
    const miniBoard = board[boardIdx];
    if (miniBoard[boxIdx] !== null) return;

    // Make a new mini-board state if the clicked box is filled
    const updatedMiniBoard = miniBoard.map(
      (value: string | null, idx: number) =>
        idx === boxIdx ? (xPlaying ? "X" : "O") : value
    );

    const updatedBoard = [...board];
    updatedBoard[boardIdx] = updatedMiniBoard;
    setBoard(updatedBoard);

    //If a mini board is won, update the mini board status
    const miniBoardWinner = checkMiniWinner(updatedMiniBoard);
    if (miniBoardWinner) {
      const updatedMiniBoardStatus = [...miniBoardStatus];
      updatedMiniBoardStatus[boardIdx] = miniBoardWinner;
      setMiniBoardStatus(updatedMiniBoardStatus);

      const updatedScores = { ...scores };
      updatedScores[miniBoardWinner === "X" ? "xScore" : "oScore"] += 1;
      setScores(updatedScores);
    }

    // Look for a winner
    const bigWinner = checkBigWinner(miniBoardStatus);
    if (bigWinner) {
      setGameOver(true);
      setWinner(bigWinner);
      return;
    }

    // Switching player turns
    setXPlaying(!xPlaying);

    // Update the last clicked box Idx
    setLastBoxIdx(boxIdx);
  };

  // Defines what to do to reset the board for a new game, and alternates who get's to start
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(Array(9).fill(null)));
    setActiveMiniBoard(null);
    setMiniBoardStatus(Array(9).fill(null));
    setLastBoxIdx(null);
    setStartingPlayer(!startingPlayer);
    setXPlaying(startingPlayer);
    setWinner(null);
  };

  return {
    board,
    xPlaying,
    scores,
    gameOver,
    activeMiniBoard,
    miniBoardStatus,
    handleBoxClick,
    resetBoard,
    winner,
  };
};
