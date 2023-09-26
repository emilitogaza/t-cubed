import React from "react";
// import "./ResetButton.scss";

export const ResetButton = ({ resetBoard }) => {
  return (
    <button className="reset-btn" onClick={resetBoard}>
      Clear board
    </button>
  );
};

// <ResetButton resetBoard={resetBoard} />
