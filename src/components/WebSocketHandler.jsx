import React, { useEffect, useState } from "react";
import { decode } from "rlp";
import useWebsocket from "../hooks/WebSocketHandler";
import { useStateContext } from "../context/StateContext";

export const WebSocketHandler = ({ wsEndpoint, securityToken }) => {
  const {
    saveShips,
    connection,
    connected,
    setEnemyAddress,
    setMessages,
    setEnemyFire,
    changeTurn,
  } = useStateContext();
  const websocket = useWebsocket({ wsEndpoint, securityToken });
  const { socketRef } = websocket;

  const decodeMessage = (msg) => {
    const uint8Array = new Uint8Array(JSON.parse(`[${msg}]`));
    const decodedArray = decode(uint8Array);

    if (decodedArray[0] instanceof Uint8Array) {
      const message = new TextDecoder().decode(decodedArray[0]);
      return message;
    }
    throw Error(`Could not decode received message: ${msg}`);
  };
  const handleReceivedMessage = async (ev) => {
    try {
      const res = decodeMessage(ev.data);
      const data = JSON.parse(res);

      if (data.type === "message") {
        const msg = data.msg;

        setMessages((state) => [...state, { received: true, message: msg }]);
      }

      if (data.type === "board") {
        const board = data.board;
        const parse = JSON.stringify(board);

        saveShips(JSON.parse(parse));
      }
      if (data.type === "position") {
        const position = data.position;
        setEnemyFire(position);
        changeTurn();
      }

      if (data.type === "connection") {
        const connect = data.type;
        if (data.addresss) {
          setEnemyAddress(data.addresss.toString());
        } else if (data.connection) {
        }
        if (!connected) connection(connect);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.addEventListener("message", handleReceivedMessage);

    return () => {
      if (!socketRef.current) return;
      socketRef.current.removeEventListener("message", handleReceivedMessage);
    };
  }, [socketRef.current]);

  return <></>;
};

export default WebSocketHandler;
