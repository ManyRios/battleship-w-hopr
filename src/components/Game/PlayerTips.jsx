const PlayerTips = ({
  gameState,
  hitsbyPlayer,
  hitsByPlayerTwo,
  startAgain,
  winner,
}) => {
  let numberOfHits = hitsbyPlayer.length;
  let numberOfSuccessfulHits = hitsbyPlayer.filter(
    (hit) => hit.type === "hit"
  ).length;
  let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));
  let succesfulEnemyHits = hitsByPlayerTwo.filter(
    (hit) => hit.type === "hit"
  ).length;

  let gameOverPanel = (
    <div>
      <div className="tip-box-title">Game Over!</div>
      <p className="player-tip">{winner}</p>
      <p className="restart" onClick={startAgain}>
        Play again?
      </p>
    </div>
  );

  let tipsPanel = (
    <div>
      <div className="tip-box-title">Stats</div>
      <div id="firing-info">
        <ul>
          <li>{numberOfSuccessfulHits} successful hits</li>
          <li>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} accuracy </li>
        </ul>
        <p className="player-tip">
          The first to sink all 4 opponent ships wins.
        </p>
        <p className="restart" onClick={startAgain}>
          Restart
        </p>
      </div>
    </div>
  );

  const turn = gameState === "Your-turn" ? "Your Turn" : "Enemy Turn";

  return (
    <div id="player-tips">
      {numberOfSuccessfulHits === 14 || succesfulEnemyHits === 14
        ? gameOverPanel
        : tipsPanel}
      <p>{gameState === "placement" ? " " : turn}</p>
    </div>
  );
};

export default PlayerTips;
