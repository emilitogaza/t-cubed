import { useState, useEffect } from "react";
import { useGame } from "./utils/useGame";
import "./App.scss";
import Logo from "./assets/icons/Logo";
import OnlineIcon from "./assets/icons/OnlineIcon";
import ResetIcon from "./assets/icons/ResetIcon";
import TimeFourIcon from "./assets/icons/TimeFourIcon";
import TimeEightIcon from "./assets/icons/TimeEightIcon";
import { Board } from "./components/Board";
import { Button } from "./components/Button";
import TimerDisplay from "./components/TimerDisplay";

function App() {
  const {
    board,
    xPlaying,
    // These are not used for the moment, maybe will in future
    // scores,
    // activePlayer,
    // timerEnabled,
    // setTimerEnabled,
    gameOver,
    activeMiniBoard,
    miniBoardStatus,
    handleBoxClick,
    resetBoard,
    winner,
    playerXTimer,
    playerOTimer,
    isPaused,
    timerSetting,
    handleTimerSelection,
    togglePause,
    resetTimers,
  } = useGame();

  return (
    <div className={`app ${xPlaying ? "bg-x" : "bg-o"}`}>
      {gameOver && (
        <div
          className={`game-over-modal ${
            winner === "O" ? "o-winner" : "x-winner"
          }`}
        >
          {winner} wins!
          <Button
            variant={`btn-gameover ${winner === "O" ? "team-o" : "team-x"}`}
            onClick={() => {
              resetBoard();
              resetTimers(timerSetting);
            }}
          >
            Play again
          </Button>
        </div>
      )}
      <div className="header">
        <Logo
          className={`logo ${xPlaying ? "logo-x" : "logo-o"} ${
            timerSetting !== "off" ? "logo-timer-active" : ""
          }`}
        />
        <TimerDisplay
          className={`timer-fade-in ${timerSetting !== "off" ? "active" : ""}`}
          playerXTimer={playerXTimer}
          playerOTimer={playerOTimer}
          xPlaying={xPlaying}
          isPaused={isPaused}
          togglePause={togglePause}
        />
      </div>
      <Board
        board={board}
        onClick={(boardIdx, boxIdx) => handleBoxClick(boardIdx, boxIdx)}
        xPlaying={xPlaying}
        activeMiniBoard={activeMiniBoard}
        miniBoardStatus={miniBoardStatus}
      />
      <div className="footer">
        <div
          className={`btn-container tool-bar ${
            xPlaying ? "x-playing" : "o-playing"
          }`}
        >
          <Button
            variant={`variant-one left ${
              xPlaying ? "btn-x-playing" : "btn-o-playing"
            }`}
          >
            {" "}
            <OnlineIcon className="btn-icon"></OnlineIcon>
            Online
          </Button>
          <Button
            variant={`variant-one  ${
              xPlaying ? "btn-x-playing" : "btn-o-playing"
            }`}
            onClick={() => {
              resetBoard();
              resetTimers(timerSetting);
            }}
          >
            <ResetIcon className="btn-icon"></ResetIcon>
            Reset
          </Button>
          <Button
            variant={`variant-one ${
              xPlaying ? "btn-x-playing" : "btn-o-playing"
            } ${timerSetting === "4min" ? "btn-active" : ""}`}
            onClick={() => handleTimerSelection("4min")}
          >
            <TimeFourIcon className="btn-icon"></TimeFourIcon>
            Timer
          </Button>
          <Button
            variant={`variant-one right ${
              xPlaying ? "btn-x-playing" : "btn-o-playing"
            } ${timerSetting === "8min" ? "btn-active" : ""}`}
            onClick={() => handleTimerSelection("8min")}
          >
            <TimeEightIcon className="btn-icon"></TimeEightIcon>
            Timer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
