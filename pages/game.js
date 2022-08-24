import { useRouter } from "next/router";
import { useEffect } from "react";
import { GameBoard, NavMenu, Footer, Chat } from "../src/components";
import { useStateContext } from "../src/context/StateContext";
import WebSocketHandler from "../src/components/WebSocketHandler";

const Game = () => {
  const router = useRouter();
  const {
    httpEndpoint,
    wsEndpoint,
    securityToken,
    setHTTPEndpoint,
    setWsEndpoint,
    setSecurityToken,
  } = useStateContext();

  useEffect(() => {
    const getParamsUrl = () => {
      if (router.query.apiEndpoint) {
        setHTTPEndpoint(router.query.apiEndpoint);
        setWsEndpoint(`${httpEndpoint}/api/v2/messages/websocket`);
      }
      if (router.query.apiToken) {
        setSecurityToken(router.query.apiToken);
      }
    };
    getParamsUrl();
  }, [router]);

  return (
    <>
      <NavMenu />
      <GameBoard />
      <Chat />
      <WebSocketHandler wsEndpoint={wsEndpoint} securityToken={securityToken} />
      <Footer />
    </>
  );
};

export default Game;
