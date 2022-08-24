import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { GameBoard, NavMenu, Footer, Chat } from "../src/components";
import { useStateContext } from "../src/context/StateContext";

const Game = () => {
  const router = useRouter();
  const { httpEndpoint, securityToken } = useStateContext();

  useEffect(() => {
    router.push({
      pathname: "/game",
      query: {
        apiEndpoint: httpEndpoint,
        apiToken: securityToken,
      },
    });
  }, []);

  return (
    <>
      <NavMenu />
      <GameBoard />
      <Chat />
      <Footer />
    </>
  );
};

export default Game;
