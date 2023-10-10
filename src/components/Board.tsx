import React from "react";
import { Box } from "./Box";
import "./Board.scss";

type BoardProps = {
  board: ("X" | "O" | null)[][];
  onClick: (boardIdx: number, boxIdx: number) => void;
  xPlaying: boolean;
  activeMiniBoard: number | null;
  miniBoardStatus: Array<"X" | "O" | null>;
};

export const Board: React.FC<BoardProps> = ({
  board,
  onClick,
  xPlaying,
  activeMiniBoard,
  miniBoardStatus,
}) => {
  const getSpecialClass = (idx: number): string => {
    switch (idx) {
      case 0:
        return "border-0";
      case 2:
        return "border-2";
      case 6:
        return "border-6";
      case 8:
        return "border-8";
      default:
        return "";
    }
  };

  return (
    <div className="board">
      {board.map((miniBoard, boardIdx) => {
        return (
          <div
            key={boardIdx}
            className={`mini-board ${getSpecialClass(boardIdx)} ${
              activeMiniBoard === boardIdx && miniBoardStatus[boardIdx] === null
                ? "active"
                : ""
            } ${
              activeMiniBoard !== null &&
              activeMiniBoard !== boardIdx &&
              miniBoardStatus[boardIdx] === null
                ? "inactive"
                : ""
            } ${
              miniBoardStatus[boardIdx] !== null && activeMiniBoard !== null
                ? "completed-dimmed"
                : ""
            } ${
              miniBoardStatus[boardIdx] !== null && activeMiniBoard === null
                ? "completed"
                : ""
            }`}
          >
            {" "}
            {miniBoard.map((value, boxIdx) => {
              return (
                <Box
                  key={boxIdx}
                  value={value}
                  onClick={() => value === null && onClick(boardIdx, boxIdx)}
                  xPlaying={xPlaying}
                  isActive={
                    activeMiniBoard === null || activeMiniBoard === boardIdx
                  }
                  miniBoardWinner={miniBoardStatus[boardIdx]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
