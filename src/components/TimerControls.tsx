import React from "react";

interface Props {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void; // Added a reset handler to be called when the reset button is clicked.
}

const TimerControls: React.FC<Props> = ({ isActive, onToggle, onReset }) => {
  return (
    <div>
      <button onClick={onToggle}>
        {isActive ? "Pause Timer" : "Start Timer"}
      </button>
      <button onClick={onReset}>Reset Timer</button>
    </div>
  );
};

export default TimerControls;

// using the component
<TimerControls
  isActive={timerEnabled}
  onToggle={() => setTimerEnabled(!timerEnabled)}
  onReset={() => {
    resetTimers();
  }}
/>;

// import TimerControls from "./components/TimerControls";
