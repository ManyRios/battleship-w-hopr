import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import debounce from "debounce";

const useWebsocket = (settings) => {
  const [reconnectTmsp, setReconnectTmsp] = useState();
  const [state, setState] = useImmer({ status: "DISCONNECTED" });

  const socketRef = useRef();

  const setReconnectTmspDebounced = debounce((timestamp) => {
    setReconnectTmsp(timestamp);
  }, 1e3);

  const handleOpenEvent = () => {
    console.info("WS CONNECTED");
    setState((draft) => {
      draft.status = "CONNECTED";
      return draft;
    });
  };

  const handleCloseEvent = () => {
    console.info("WS DISCONNECTED");
    setState((draft) => {
      draft.status = "DISCONNECTED";
      return draft;
    });
    setReconnectTmspDebounced(+new Date());
  };

  const handleErrorEvent = (e) => {
    console.error("WS ERROR", e);
    setState((draft) => {
      draft.status = "DISCONNECTED";
      draft.error = String(e);
    });
    setReconnectTmspDebounced(+new Date());
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (socketRef.current) {
      console.info("WS Disconnecting..");
      socketRef.current.close(1000, "Shutting down");
    }

    // need to set the token in the query parameters, to enable websocket authentication
    try {
      const wsUrl = new URL(settings.wsEndpoint);
      wsUrl.protocol = wsUrl.protocol === "https:" ? "wss" : "ws";

      if (settings.securityToken) {
        wsUrl.search = `?apiToken=${settings.securityToken}`;
      }
      console.info("WS Connecting..");
      socketRef.current = new WebSocket(wsUrl);
      
      // handle connection opening
      socketRef.current.addEventListener("open", handleOpenEvent);
      // handle connection closing
      socketRef.current.addEventListener("close", handleCloseEvent);
      // handle errors
      socketRef.current.addEventListener("error", handleErrorEvent);
    } catch (err) {
      console.error("URL is invalid", settings.wsEndpoint);
    }

    // cleanup when unmountinge922Dbdf9ba2EbfD1bD54#8b
    return () => {
      if (!socketRef.current) return;

      socketRef.current.removeEventListener("open", handleOpenEvent);
      socketRef.current.removeEventListener("close", handleCloseEvent);
      socketRef.current.removeEventListener("error", handleErrorEvent);
    };
  }, [settings.wsEndpoint, settings.securityToken]);

  return {
    state,
    socketRef,
  };
};

export default useWebsocket;
