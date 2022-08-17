import { useState, useEffect, useRef } from "react";

import GameView from "./GameView";
import {
  SQUARE_STATE,
  indexToCoords,
  putEntityInLayout,
  generateEmptyLayout,
  getNeighbors,
  updateSunkShips,
  coordsToIndex,
} from "../utils";

import { AVAILABLE_SHIPS } from "../../utils/constants";

import { useStateContext } from "../../context/StateContext";

const GameBoard = () => {
  const [winner, setWinner] = useState(null);

  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  const [availableShips, setAvailableShips] = useState(AVAILABLE_SHIPS);
  const [hitsByPlayer, setHitsByPlayer] = useState([]);
  const [hitsByPlayerTwo, setHitsByPlayerTwo] = useState([]);

  const {
    enemyFire,
    setEnemyFire,
    setPlacedShips,
    placedShips,
    sendBoardToEnemy,
    changeTurn,
    enemyShips,
    setEnemyShips,
    join,
    gameState,
    setGameState,
  } = useStateContext();

  // *** PLAYER ***
  const selectShip = (shipName) => {
    let shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
    const shipToPlace = availableShips[shipIdx];

    setCurrentlyPlacing({
      ...shipToPlace,
      orientation: "horizontal",
      position: null,
    });
  };

  const placeShip = (currentlyPlacing) => {
    setPlacedShips([
      ...placedShips,
      {
        ...currentlyPlacing,
        placed: true,
      },
    ]);

    setAvailableShips((previousShips) =>
      previousShips.filter((ship) => ship.name !== currentlyPlacing.name)
    );

    setCurrentlyPlacing(null);
  };

  const rotateShip = (event) => {
    if (currentlyPlacing != null && event.button === 2) {
      
      setCurrentlyPlacing({
        ...currentlyPlacing,
        orientation:
          currentlyPlacing.orientation === "vertical"
            ? "horizontal"
            : "vertical",
      });
    }
  };

  const startTurn = () => {
    sendBoardToEnemy();
    if (join) {
      setGameState("Enemy-turn");
    } else {
      setGameState("Your-turn");
    }
  };

  // *** ENEMY ***

  const EnemyFire = (index, layout) => {
    let playerTwo;

    if (layout[index] === "ship") {
      playerTwo = [
        ...hitsByPlayerTwo,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
    
    }
    if (layout[index] === "empty") {
      playerTwo = [
        ...hitsByPlayerTwo,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
   
    }
    const sunkShips = updateSunkShips(playerTwo, placedShips);
    const sunkShipsAfter = sunkShips.filter((ship) => ship.sunk).length;
    const sunkShipsBefore = placedShips.filter((ship) => ship.sunk).length;
    if (sunkShipsAfter > sunkShipsBefore) {
      playSound("sunk");
    }
    setPlacedShips(sunkShips);
    setHitsByPlayerTwo(playerTwo);
  };

  // Change to Enemy turn, check if game over and stop if yes; if not fire into an eligible square
  const handleEnemyTurn = () => {
    
    if (checkIfGameOver()) return;

    // Recreate layout to get eligible squares
    let layout = placedShips.reduce(
      (prevLayout, currentShip) =>
        putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
      generateEmptyLayout()
    );

    layout = hitsByPlayerTwo.reduce(
      (prevLayout, currentHit) =>
        putEntityInLayout(prevLayout, currentHit, currentHit.type),
      layout
    );

    layout = placedShips.reduce(
      (prevLayout, currentShip) =>
        currentShip.sunk
          ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
          : prevLayout,
      layout
    );

    let successfulEnemyHits = hitsByPlayerTwo.filter(
      (hit) => hit.type === "hit"
    );

    let nonSunkEnemyHits = successfulEnemyHits.filter((hit) => {
      const hitIndex = coordsToIndex(hit.position);
      return layout[hitIndex] === "hit";
    });

    let potentialTargets = nonSunkEnemyHits
      .flatMap((hit) => getNeighbors(hit.position))
      .filter((idx) => layout[idx] === "empty" || layout[idx] === "ship");

    // Until there's a successful hit
    if (potentialTargets.length === 0) {
      let layoutIndices = layout.map((item, idx) => idx);
      potentialTargets = layoutIndices.filter(
        (index) => layout[index] === "ship" || layout[index] === "empty"
      );
    }

    if (enemyFire) {
      EnemyFire(enemyFire, layout);
    }
  };

  // *** END GAME ***

  // Check if either player or Enemy ended the game
  const checkIfGameOver = () => {
    let successfulPlayerHits = hitsByPlayer.filter(
      (hit) => hit.type === "hit"
    ).length;
    let successfulPlayerTwoHits = hitsByPlayerTwo.filter(
      (hit) => hit.type === "hit"
    ).length;

    if (successfulPlayerTwoHits === 14 || successfulPlayerHits === 14) {
      setGameState("game-over");

      if (successfulPlayerTwoHits === 14) {
        setWinner("You lose 😭. Better luck next time!");
        playSound("lose");
      }
      if (successfulPlayerHits === 14) {
        setWinner("You win! 🎉");
        playSound("win");
      }

      return true;
    }

    return false;
  };

  const startAgain = () => {
    setGameState("placement");
    setWinner(null);
    setEnemyFire();
    setCurrentlyPlacing(null);
    setPlacedShips([]);
    setAvailableShips(AVAILABLE_SHIPS);
    setEnemyShips([]);
    setHitsByPlayer([]);
    setHitsByPlayerTwo([]);
  };

  const sunkSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const lossSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  const stopSound = (sound) => {
    sound.current.pause();
    sound.current.currentTime = 0;
  };
  const playSound = (sound) => {
    if (sound === "sunk") {
      stopSound(sunkSoundRef);
      sunkSoundRef.current.play();
    }

    if (sound === "click") {
      stopSound(clickSoundRef);
      clickSoundRef.current.play();
    }

    if (sound === "lose") {
      stopSound(lossSoundRef);
      lossSoundRef.current.play();
    }

    if (sound === "win") {
      stopSound(winSoundRef);
      winSoundRef.current.play();
    }
  };
  return (
    <>
      <audio
        ref={sunkSoundRef}
        src="/sounds/ship_sunk.wav"
        className="clip"
        preload="auto"
      />
      <audio
        ref={clickSoundRef}
        src="/sounds/click.wav"
        className="clip"
        preload="auto"
      />
      <audio
        ref={lossSoundRef}
        src="/sounds/lose.wav"
        className="clip"
        preload="auto"
      />
      <audio
        ref={winSoundRef}
        src="/sounds/win.wav"
        className="clip"
        preload="auto"
      />
      <GameView
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
        startTurn={startTurn}
        enemyShips={enemyShips}
        gameState={gameState}
        changeTurn={changeTurn}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        hitsByPlayerTwo={hitsByPlayerTwo}
        setHitsByPlayerTwo={setHitsByPlayerTwo}
        handleEnemyTurn={handleEnemyTurn}
        checkIfGameOver={checkIfGameOver}
        startAgain={startAgain}
        winner={winner}
        setEnemyShips={setEnemyShips}
        playSound={playSound}
      />
    </>
  );
};

export default GameBoard;
