import { useEffect, useRef } from "react";
import { Row } from "react-bootstrap";
import { useStateContext } from "../../context/StateContext";

const ChatView = () => {
  const { messages } = useStateContext();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const viewMessages = messages.map((item, i) => (
    <div
      className={`d-flex flex-row justify-content-${
        item.received ? "start" : "end"
      } mb-2 pt-1`}
      key={i}
    >
      <div>
        <p
          className={`small p-2 me-3 mb-1 text-white rounded-3 bg-${
            item.received ? "dark" : "primary"
          }`}
        >
          {item.message}
        </p>
      </div>
      <div ref={bottomRef} />
    </div>
  ));

  const noMessage = (
    <div className="d-flex flex-row justify-content-start mb-4 pt-1 ">
      <p className="small p-2 me-3 mb-1 text-black bg-light">
        {" "}
        No Messages to Show{" "}
      </p>
    </div>
  );

  return (
    <Row>
      <div className="border rounded p-3  content-chat overflow-auto">
        {messages.length > 0 ? viewMessages : noMessage}
      </div>
    </Row>
  );
};

export default ChatView;
