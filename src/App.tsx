import { useGame } from "./utils/useGame";
import "./App.scss";
import KumpanLogo from "./assets/icons/KumpanLogo";
import { Board } from "./components/Board";
// import { ScoreBoard } from "./components/ScoreBoard";
import { Button } from "./components/Button";

function App() {
  const {
    board,
    xPlaying,
    scores,
    gameOver,
    activeMiniBoard,
    miniBoardStatus,
    handleBoxClick,
    resetBoard,
    winner,
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
            variant={` ${winner === "O" ? "team-o" : "team-x"}`}
            onClick={resetBoard}
          >
            Play again
          </Button>
        </div>
      )}
      <KumpanLogo className="logo" color={xPlaying ? "#383140" : "#3b4846"} />{" "}
      <Board
        board={board}
        onClick={(boardIdx, boxIdx) => handleBoxClick(boardIdx, boxIdx)}
        xPlaying={xPlaying}
        activeMiniBoard={activeMiniBoard}
        miniBoardStatus={miniBoardStatus}
      />
      <div className="btn-container">
        <Button variant="variant-one" onClick={resetBoard}>
          Reset the board
        </Button>
      </div>
    </div>
  );
}

export default App;
