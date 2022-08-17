import { Container, Col, Row  } from "react-bootstrap";
import {GameBoard, NavMenu, Footer, Chat} from '../src/components'

const Game = () => {
  return (
    <>
      <NavMenu/>
      <GameBoard/>
      <Chat  />
      <Footer/>
    </>
    
  );
};

export default Game;
