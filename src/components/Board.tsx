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
  return (
    <div className="board">
      {board.map((miniBoard, boardIdx) => {
        return (
          <div
            key={boardIdx}
            className={`mini-board ${
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
