import { useState, useEffect } from "react";
import { checkMiniWinner, checkBigWinner } from "./gameLogic";

export const useGame = () => {
  // Game timer
  const BASE_TIME_4MIN = 240; // 4 minutes in seconds
  const BASE_TIME_8MIN = 480; // 8 minutes in seconds
  const INCREMENT_TIME = 5;
  const [playerXTimer, setPlayerXTimer] = useState(BASE_TIME_4MIN);
  const [playerOTimer, setPlayerOTimer] = useState(BASE_TIME_4MIN);
  const [isPaused, setIsPaused] = useState(false);
  const [firstMoveMade, setFirstMoveMade] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerSetting, setTimerSetting] = useState<"off" | "4min" | "8min">(
    "off"
  );
  const [timerStarted, setTimerStarted] = useState(false);

  // TogglePause function
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Starting the timer (based on the first move)
  const startTimer = () => {
    if (!timerStarted) setTimerStarted(true);
  };

  // Game logic
  const [timerEnabled, setTimerEnabled] = useState(false);
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

  const activePlayer = xPlaying ? "X" : "O";

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

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (gameStarted && timerSetting !== "off" && !isPaused) {
      interval = setInterval(() => {
        if (activePlayer === "X") {
          setPlayerXTimer((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              setGameOver(true);
              setWinner("O");
              return prev;
            }
            return prev - 1;
          });
        } else {
          setPlayerOTimer((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              setGameOver(true);
              setWinner("X");
              return prev;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activePlayer, timerSetting, isPaused, gameStarted]);

  // Logic for clicking on a box: don't allow click if mini board is won, and don't allow click if the game is over or is already clicked
  const handleBoxClick = (boardIdx: number, boxIdx: number) => {
    // Check for conditions if the click is invalid
    if (
      miniBoardStatus[boardIdx] !== null ||
      gameOver ||
      (activeMiniBoard !== null && boardIdx !== activeMiniBoard)
    ) {
      return;
    }

    // Increment time for the player who just played BEFORE switching turns.
    if (!firstMoveMade) {
      setFirstMoveMade(true);
    } else {
      if (xPlaying) {
        setPlayerXTimer((prev) => prev + INCREMENT_TIME);
      } else {
        setPlayerOTimer((prev) => prev + INCREMENT_TIME);
      }
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

    // Sets game as started after the first move
    if (!gameStarted && timerSetting !== "off") {
      setGameStarted(true);
    }
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
    setGameStarted(false);
    setFirstMoveMade(false);
  };

  const resetTimers = (timeSetting: "off" | "4min" | "8min") => {
    switch (timeSetting) {
      case "4min":
        setPlayerXTimer(BASE_TIME_4MIN);
        setPlayerOTimer(BASE_TIME_4MIN);
        break;
      case "8min":
        setPlayerXTimer(BASE_TIME_8MIN);
        setPlayerOTimer(BASE_TIME_8MIN);
        break;
      default:
        setPlayerXTimer(0);
        setPlayerOTimer(0);
        break;
    }
  };

  const handleTimerSelection = (selectedTime: "off" | "4min" | "8min") => {
    if (timerSetting === selectedTime) {
      setTimerSetting("off");
      resetTimers("off");
    } else {
      setTimerSetting(selectedTime);
      resetTimers(selectedTime);
    }
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
    timerEnabled,
    setTimerEnabled,
    activePlayer,
    playerXTimer,
    playerOTimer,
    isPaused,
    timerSetting,
    setTimerSetting,
    handleTimerSelection,
    startTimer,
    resetTimers,
    togglePause,
  };
};
