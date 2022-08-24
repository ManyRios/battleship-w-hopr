import { useState } from "react";
import { Form } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { useStateContext } from "../../context/StateContext";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  const { sendMessage, enemyAddress, messages, setMessages } =
    useStateContext();

  const handleMessage = () => {
    if (input.length > 0 && input !== " ") {
      setMessage(input);
      setMessages((msg) => [...msg, { received: false, message: input }]);
      sendMessage(
        enemyAddress,
        JSON.stringify({ type: "message", msg: input })
      );
      setMessage("");
      setInput("");
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && e.shiftKey == false && input.length > 0) {
      e.preventDefault();
      handleMessage();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="d-inline-flex mt-2 p-3">
      <Form.Control
        value={input}
        onChange={handleChange}
        onKeyDown={handleEnterPress}
        className="m-2"
      />
      <div
        className="text-muted d-flex justify-content-start align-items-center rounded-3 p-3 bg-primary cursor-pointer"
        onClick={handleMessage}
        disabled={input.length > 0 && input !== "" ? true : false}
      >
        <BiSend color="white" fontSize={"16"} />
      </div>
    </div>
  );
};

export default ChatInput;
