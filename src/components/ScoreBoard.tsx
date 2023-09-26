import "./ScoreBoard.scss";

type Scores = {
  xScore: number;
  oScore: number;
};

type ScoreBoardProps = {
  scores: Scores;
  xPlaying: boolean;
};

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, xPlaying }) => {
  const { xScore, oScore } = scores;
  return (
    <div className="score-board">
      <div className={`score x-score ${!xPlaying && "inactive"}`}>
        <span className="title">Team X</span>
        <span>{xScore} points</span>
      </div>
      <div className={`score o-score ${xPlaying && "inactive"}`}>
        <span className="title">Team O</span>
        <span>{oScore} points</span>
      </div>
    </div>
  );
};
