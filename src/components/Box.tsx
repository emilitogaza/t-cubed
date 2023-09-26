import "./Box.scss";
import { Icon } from "./IconContainer";

type BoxProps = {
  value: "X" | "O" | null;
  onClick: () => void;
  xPlaying: boolean;
  isActive: boolean;
  miniBoardWinner: "X" | "O" | null;
};

export const Box: React.FC<BoxProps> = ({
  value,
  onClick,
  xPlaying,
  isActive,
  miniBoardWinner,
}) => {
  const style = value === "X" ? "box x" : value === "O" ? "box o" : "box";
  const turnClass =
    value === null && miniBoardWinner === null
      ? xPlaying
        ? "x-turn"
        : "o-turn"
      : "";
  const hoverClass = xPlaying ? "x-hover" : "o-hover";
  const activeClass = isActive ? "active" : "";
  const winningColor =
    miniBoardWinner === "X"
      ? "box-win-x"
      : miniBoardWinner === "O"
      ? "box-win-o"
      : "";

  return (
    <button
      className={`${style} ${turnClass} ${hoverClass} ${activeClass} ${winningColor}`}
      onClick={onClick}
    >
      {value === "X" && miniBoardWinner !== "O" ? (
        <Icon className="icon-wrapper" name="XIcon" />
      ) : value === "O" && miniBoardWinner !== "X" ? (
        <Icon className="icon-wrapper" name="OIcon" />
      ) : null}
    </button>
  );
};
