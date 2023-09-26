import { useState, useEffect } from "react";
import { useGame } from "./utils/useGame";
import "./App.scss";
import Logo from "./components/Logo";
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import { Button } from "./components/Button";
import { checkMiniWinner, checkBigWinner } from "./utils/gameLogic";

const initializeBoard = () => Array(9).fill(Array(9).fill(null));

function App() {
  const [board, setBoard] = useState(initializeBoard());
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [activeMiniBoard, setActiveMiniBoard] = useState<number | null>(null);
  const [lastBoxIdx, setLastBoxIdx] = useState<number | null>(null);
  const [miniBoardStatus, setMiniBoardStatus] = useState<
    Array<"X" | "O" | null>
  >(Array(9).fill(null));

  useEffect(() => {
    if (lastBoxIdx !== null && miniBoardStatus[lastBoxIdx] === null) {
      setActiveMiniBoard(lastBoxIdx);
    } else {
      setActiveMiniBoard(null); // Allow the next move to be in any mini-board
    }
  }, [miniBoardStatus, lastBoxIdx]);

  const resetBoard = () => {
    setGameOver(false);
    setBoard(initializeBoard());
    setActiveMiniBoard(null);
    setMiniBoardStatus(Array(9).fill(null)); // Why is this in the reset board function?
    setXPlaying(true); // Should I be reset or alternating the starting player maybe
  };

  const handleBoxClick = (boardIdx: number, boxIdx: number) => {
    // Don't allow click if the mini-board is already won
    if (miniBoardStatus[boardIdx] !== null) return;

    // Don't allow click if the game is over or if the click
    if (
      gameOver ||
      (activeMiniBoard !== null && boardIdx !== activeMiniBoard)
    ) {
      return;
    }

    // Don't allow click if the box in the mini-board is already filled
    const miniBoard = board[boardIdx];
    if (miniBoard[boxIdx] !== null) return;

    // Make a new mini-board state if the clicked box is filled
    const updatedMiniBoard = miniBoard.map(
      (value: string | null, idx: number) => {
        return idx === boxIdx ? (xPlaying ? "X" : "O") : value;
      }
    );

    const updatedMiniBoardStatus = [...miniBoardStatus];

    //If a mini board is won, update mini board status
    const miniBoardWinner = checkMiniWinner(updatedMiniBoard);
    if (miniBoardWinner) {
      updatedMiniBoardStatus[boardIdx] = miniBoardWinner;
      setMiniBoardStatus(updatedMiniBoardStatus);

      // Update scores
      const updatedScores = { ...scores };
      updatedScores[miniBoardWinner === "X" ? "xScore" : "oScore"] += 1;
      setScores(updatedScores);
    }

    // Update board state
    const updatedBoard = [...board];
    updatedBoard[boardIdx] = updatedMiniBoard;
    setBoard(updatedBoard);

    // Look for a winner
    const bigWinner = checkBigWinner(updatedMiniBoardStatus);
    if (bigWinner) {
      console.log("Game over is now set to true");
      setGameOver(true);
    }

    // Switching turns
    setXPlaying(!xPlaying);

    // Update last clicked box index
    setLastBoxIdx(boxIdx);
  };

  return (
    <div className={`app ${xPlaying ? "bg-x" : "bg-o"}`}>
      <Logo className="logo" color={xPlaying ? "#383140" : "#3b4846"} />{" "}
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board
        board={board}
        onClick={(boardIdx, boxIdx) => handleBoxClick(boardIdx, boxIdx)}
        xPlaying={xPlaying}
        activeMiniBoard={activeMiniBoard} // Passing the activeMiniBoard as a prop
        miniBoardStatus={miniBoardStatus}
      />
      <div className="btn-container">
        <Button variant="team-x" onClick={resetBoard}>
          Reset the board
        </Button>
      </div>
    </div>
  );
}

export default App;

//next part

// useGame.ts
import { useState, useEffect } from "react";
import { WIN_CONDITIONS, checkMiniWinner, checkBigWinner } from "./gameLogic";

export const useGame = () => {
  // State management
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(null)));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [activeMiniBoard, setActiveMiniBoard] = useState<number | null>(null);
  const [lastBoxIdx, setLastBoxIdx] = useState<number | null>(null);
  const [miniBoardStatus, setMiniBoardStatus] = useState<
    Array<"X" | "O" | null>
  >(Array(9).fill(null));

  // Effects
  useEffect(() => {
    // Similar to your existing useEffect in App.tsx
    if (lastBoxIdx !== null && miniBoardStatus[lastBoxIdx] === null) {
      setActiveMiniBoard(lastBoxIdx);
    } else {
      setActiveMiniBoard(null);
    }
  }, [miniBoardStatus, lastBoxIdx]);

  // Handlers
  const handleBoxClick = (boardIdx: number, boxIdx: number) => {
    // Similar to your existing handleBoxClick function in App.tsx
    // Your existing logic here
  };

  const resetBoard = () => {
    // Similar to your existing resetBoard function in App.tsx
    setGameOver(false);
    setBoard(Array(9).fill(Array(9).fill(null)));
    setActiveMiniBoard(null);
    setMiniBoardStatus(Array(9).fill(null));
    setXPlaying(true);
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
  };
};

<!-- ScoreBoard scores={scores} xPlaying={xPlaying} /> -->
