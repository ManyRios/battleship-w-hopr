import { Button, OverlayTrigger, Popover, Card } from "react-bootstrap";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { useStateContext } from "../../context/StateContext";
import ChatView from "./ChatView";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { connected } = useStateContext();

  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      className="d-flex justify-content-end"
      overlay={
        <Popover id={`popover-positioned-top`} className="popover">
          <Popover.Header as="h3">Chat</Popover.Header>
          <Popover.Body className="">
            <ChatView className="position-relative h-auto" />
          </Popover.Body>
          <ChatInput />
        </Popover>
      }
    >
      <Button
        className="justify-content-end"
        disabled={connected ? true : false}
      >
        {" "}
        <BsChatSquareDotsFill />
      </Button>
    </OverlayTrigger>
  );
};

export default Chat;
