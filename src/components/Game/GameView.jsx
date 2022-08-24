import { Row, Col } from "react-bootstrap";
import PlayerFleet from "./PlayerFleet";
import PlayerBoard from "./PlayerBoard";
import EnemyBoard from "./EnemyBoard";
import PlayerTips from "./PlayerTips";

const GameView = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  startTurn,
  enemyShips,
  gameState,
  changeTurn,
  hitComputer,
  hitsByPlayer,
  setHitsByPlayer,
  hitsByPlayerTwo,
  handleEnemyTurn,
  checkIfGameOver,
  winner,
  startAgain,
  setEnemyShips,
  playSound,
}) => {
  return (
    <section id="game-screen">
      {gameState !== "placement" ? (
        <PlayerTips
          gameState={gameState}
          hitsbyPlayer={hitsByPlayer}
          hitsByPlayerTwo={hitsByPlayerTwo}
          winner={winner}
          startAgain={startAgain}
        />
      ) : (
        <PlayerFleet
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
          startTurn={startTurn}
          startAgain={startAgain}
        />
      )}

      <PlayerBoard
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
        hitsByPlayerTwo={hitsByPlayerTwo}
        playSound={playSound}
      />

      <EnemyBoard
        enemyShips={enemyShips}
        changeTurn={changeTurn}
        gameState={gameState}
        hitComputer={hitComputer}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleEnemyTurn={handleEnemyTurn}
        checkIfGameOver={checkIfGameOver}
        setEnemyShips={setEnemyShips}
        playSound={playSound}
      />
    </section>
  );
};

export default GameView;
