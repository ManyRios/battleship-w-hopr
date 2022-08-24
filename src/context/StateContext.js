import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";
import { getHeaders } from "../components/utils";
import { decode } from "rlp";
import useWebsocket from "../hooks/WebSocketHandler";

const Context = createContext();

export const StateContext = ({ children }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showModalConnect, setShowModalConnect] = useState(false);
  const [httpEndpoint, setHTTPEndpoint] = useState("");
  const [wsEndpoint, setWsEndpoint] = useState("");
  const [securityToken, setSecurityToken] = useState("");
  const [gameState, setGameState] = useState("placement");
  const [configured, setConfigured] = useState(false);
  const [address, setAddress] = useState("");
  const [enemyAddress, setEnemyAddress] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [enemyFire, setEnemyFire] = useState(null);
  const [connected, setConnected] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);
  const [enemyShips, setEnemyShips] = useState([]);
  const [temp, setTemp] = useState([]);
  const [join, setJoin] = useState(false);

  useEffect(() => {
    const loadAddress = async () => {
      const headers = getHeaders(securityToken);

      const account = await fetch(`${httpEndpoint}/api/v2/account/addresses`, {
        headers,
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
      setAddress(account?.hopr);
    };
    if (httpEndpoint) loadAddress();
  }, [securityToken, httpEndpoint]);

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const handleModalConnect = (e) => {
    e.preventDefault();
    setShowModalConnect(!showModalConnect);
  };

  useEffect(() => {
    if (httpEndpoint && wsEndpoint && securityToken) {
      setConfigured(true);
    }
  }, [httpEndpoint, wsEndpoint, securityToken, setConfigured]);

  const sendMessage = (recipient, body) => {
   
    if (!address) return;

    try {
      fetch(`${httpEndpoint}/api/v2/messages`, {
        method: "POST",
        headers: getHeaders(securityToken, true),
        body: JSON.stringify({
          recipient,
          body,
        }),
      })
        .then((res) =>
          res.status === 422
            ? alert("Unable to Send Request. Please try again")
            : console.log(res)
        )
        .catch((err) => console.error(err));
    } catch (e) {
      console.log(e);
    }
  };

  const sendMove = async (move) => {
    await sendMessage(enemyAddress, `${address}-${move}`);
    setNotification(`You have sent the move ${move} to referee ${referee}`);
  };

  const saveShips = (layout) => {
    let arr = Object.values(layout);
    setTemp([...arr]);

    if (arr.length === 4) {
      setEnemyShips([...arr]);

      arr = [];
    } else if (temp.length > 4) {
      array = [];
    }
  };

  const joinBattle = () => {
    setJoin(true);
    sendMessage(
      enemyAddress,
      JSON.stringify({ type: "connection", addresss: address })
    );
  };

  const connection = () => {
    setConnected(true);
    alert("connected with node", enemyAddress);
  };

  const sendBoardToEnemy = () => {
    if (placedShips) {
      let fy = {};
      Object.assign(fy, placedShips);

      sendMessage(enemyAddress, JSON.stringify({ type: "board", board: fy }));
    }
  };

  const changeTurn = () => {
    setGameState((oldGameState) =>
      oldGameState === "Your-turn" ? "Enemy-turn" : "Your-turn"
    );
  };

  return (
    <Context.Provider
      value={{
        showModal,
        showModalConnect,
        setShowModalConnect,
        handleModal,
        handleModalConnect,
        httpEndpoint,
        setHTTPEndpoint,
        wsEndpoint,
        setWsEndpoint,
        securityToken,
        setSecurityToken,
        configured,
        setConfigured,
        sendMove,
        sendMessage,
        address,
        setAddress,
        enemyAddress,
        setEnemyAddress,
        message,
        setMessage,
        enemyFire,
        setEnemyFire,
        placedShips,
        setPlacedShips,
        enemyShips,
        setEnemyShips,
        sendBoardToEnemy,
        join,
        setJoin,
        joinBattle,
        changeTurn,
        gameState,
        setGameState,
        setMessages,
        messages,
        connection,
        saveShips,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
