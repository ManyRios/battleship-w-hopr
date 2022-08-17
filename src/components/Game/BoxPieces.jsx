const BoxPieces = ({
    shipName,
    selectShip,
    availableShips,
    isCurrentlyPlacing,
  }) => {
    const ship = availableShips.find((item) => item.name === shipName)
    const shipLength = new Array(ship.length).fill('ship')
    const allReplicaSquares = shipLength.map((item, index) => (
      <div className="small-square" key={index} />
    ))
  
    return (
      <div
        id={`${shipName}-replica`}
        onClick={() => selectShip(shipName)}
        key={`${shipName}`}
        className={isCurrentlyPlacing ? 'replica placing' : 'replica'}
      >
        <div className="replica-title">{shipName}</div>
        <div className="replica-squares">{allReplicaSquares}</div>
      </div>
    )
  }

export default BoxPieces