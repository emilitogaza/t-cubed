import { useState, useEffect } from "react";

interface Props {
  activePlayer: "X" | "O";
  onTimeUp: (player: "X" | "O") => void;
  enabled: boolean;
}

const BASE_TIME = 300;
const INCREMENT_TIME = 10;

export default function GameTimer({ activePlayer, onTimeUp, enabled }: Props) {
  const [playerXTimer, setPlayerXTimer] = useState(BASE_TIME);
  const [playerOTimer, setPlayerOTimer] = useState(BASE_TIME);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (enabled && !isPaused) {
      interval = setInterval(() => {
        if (activePlayer === "X") {
          setPlayerXTimer((prev) => {
            if (prev <= 0) {
              onTimeUp("X");
              clearInterval(interval);
            }
            return prev - 1;
          });
        } else {
          setPlayerOTimer((prev) => {
            if (prev <= 0) {
              onTimeUp("O");
              clearInterval(interval);
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePlayer, enabled, isPaused, onTimeUp]);

  useEffect(() => {
    if (timerEnabled) {
      // Make sure the timer is enabled before incrementing
      if (activePlayer === "O") {
        // Note the inversion here
        setPlayerXTimer((prev) => prev + INCREMENT_TIME);
      } else {
        setPlayerOTimer((prev) => prev + INCREMENT_TIME);
      }
    }
  }, [activePlayer, timerEnabled]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <div>Player X: {formatTime(playerXTimer)} minutes</div>
      <div>Player O: {formatTime(playerOTimer)} minutes</div>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <button
        onClick={() => {
          setPlayerXTimer(BASE_TIME);
          setPlayerOTimer(BASE_TIME);
        }}
      >
        Reset
      </button>
    </div>
  );
}
