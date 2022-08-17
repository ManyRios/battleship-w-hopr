import { useEffect } from "react";
import {
  stateToClass,
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  indexToCoords,
  updateSunkShips,
} from "../utils";

import { useStateContext } from "../../context/StateContext";

const EnemyBoard = ({
  enemyShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  checkIfGameOver,
  setEnemyShips,
  handleEnemyTurn,
  playSound,
}) => {
  const { sendMessage, enemyAddress, enemyFire, changeTurn } =
    useStateContext();

  let compLayout = enemyShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  //  Add hits dealt by player
  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );

  compLayout = enemyShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    compLayout
  );

  // Check what's at the square and decide what next
  const fireTorpedo = (index) => {
    if (compLayout[index] === "ship") {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === "empty") {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  const playerTurn = gameState === "Your-turn";
  const playerCanFire = playerTurn && !checkIfGameOver();

  const alreadyHit = (index) =>
    compLayout[index] === "hit" ||
    compLayout[index] === "miss" ||
    compLayout[index] === "ship-sunk";

  const compSquares = compLayout.map((square, index) => {
    return (
      <div
        // Only display square if it's a hit, miss, or sunk ship
        className={
          stateToClass[square] === "hit" ||
          stateToClass[square] === "miss" ||
          stateToClass[square] === "ship-sunk"
            ? `square ${stateToClass[square]}`
            : `square`
        }
        key={`comp-square-${index}`}
        id={`comp-square-${index}`}
        onClick={() => {
          if (playerCanFire && !alreadyHit(index)) {
            sendMessage(
              enemyAddress,
              JSON.stringify({ type: "position", position: index })
            );
            const newHits = fireTorpedo(index);
            const shipsWithSunkFlag = updateSunkShips(newHits, enemyShips);
            const sunkShipsAfter = shipsWithSunkFlag.filter(
              (ship) => ship.sunk
            ).length;
            const sunkShipsBefore = enemyShips.filter(
              (ship) => ship.sunk
            ).length;
            if (sunkShipsAfter > sunkShipsBefore) {
              playSound("sunk");
            }
            setEnemyShips(shipsWithSunkFlag);
            changeTurn();
          }
        }}
      />
    );
  });

  useEffect(() => {
    handleEnemyTurn();
  }, [enemyFire])

  return (
    <>
      {enemyShips ? (
        <div>
          <h2 className="player-title">Enemy</h2>
          <div className="board">{compSquares}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default EnemyBoard;
