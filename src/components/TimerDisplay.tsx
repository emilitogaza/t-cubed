import PauseIcon from "../assets/icons/PauseIcon";
import { Button } from "./Button";
import "./TimerDisplay.scss";
import "./Button.scss";

interface Props {
  playerXTimer: number;
  playerOTimer: number;
  xPlaying: boolean;
  isPaused: boolean;
  togglePause: () => void;
}

const TimerDisplay: React.FC<Props> = ({
  playerXTimer,
  playerOTimer,
  isPaused,
  togglePause,
  xPlaying,
}) => {
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={`btn-container ${xPlaying ? "x-playing" : "o-playing"}`}>
      <div
        className={`countdown-timer left ${
          xPlaying ? "countdown-x-playing active" : "countdown-o-playing"
        }`}
      >
        {formatTime(playerXTimer)}
      </div>
      <Button
        className={`pause-btn ${isPaused ? "btn-active" : ""}`}
        variant={`variant-one ${xPlaying ? "btn-x-playing" : "btn-o-playing"}`}
        onClick={togglePause}
      >
        {" "}
        <PauseIcon className="btn-icon"></PauseIcon>
        {isPaused ? "Resume" : "Pause"}
      </Button>
      <div
        className={`countdown-timer right ${
          !xPlaying ? "countdown-o-playing active" : "countdown-x-playing"
        }`}
      >
        {formatTime(playerOTimer)}
      </div>
    </div>
  );
};

export default TimerDisplay;
