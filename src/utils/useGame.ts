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

  // Check for a big winner and update the game state
  useEffect(() => {
    const bigWinner = checkBigWinner(miniBoardStatus);
    if (bigWinner) {
      setGameOver(true);
      setWinner(bigWinner);
    }
  }, [miniBoardStatus]);

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
    // Check for conditions where the click is invalid
    if (
      miniBoardStatus[boardIdx] !== null ||
      gameOver ||
      (activeMiniBoard !== null && boardIdx !== activeMiniBoard)
    ) {
      return;
    }

    // Check if the box in the mini-board is already filled
    const miniBoard = board[boardIdx];
    if (miniBoard[boxIdx] !== null) return;

    // Create a new state for the mini-board after the box is clicked
    const updatedMiniBoard = miniBoard.map(
      (value: string | null, idx: number) =>
        idx === boxIdx ? (xPlaying ? "X" : "O") : value
    );

    // Update the state of the entire board
    // Disabled temporary: const updatedBoard = [...board];
    const updatedBoard = JSON.parse(JSON.stringify(board));
    updatedBoard[boardIdx] = updatedMiniBoard;
    setBoard(updatedBoard);

    // Check if a mini-board has been won, and update state accordingly
    const miniBoardWinner = checkMiniWinner(updatedMiniBoard);
    if (miniBoardWinner) {
      console.log("Mini board was won by", miniBoardWinner);
      const updatedMiniBoardStatus = [...miniBoardStatus];
      updatedMiniBoardStatus[boardIdx] = miniBoardWinner;
      setMiniBoardStatus(updatedMiniBoardStatus);

      // Update scores
      const updatedScores = { ...scores };
      updatedScores[miniBoardWinner === "X" ? "xScore" : "oScore"] += 1;
      setScores(updatedScores);
    }

    // If no winner yet, switch player turns
    if (!gameOver) {
      setXPlaying(!xPlaying);
    }

    // Update the index of the last clicked box
    setLastBoxIdx(boxIdx);
  };

  // Defines what to do to reset the board for a new game, and alternates who get's to start as well
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
