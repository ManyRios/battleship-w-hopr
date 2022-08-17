import { useStateContext } from '../context/StateContext';

import { Modal, Button, Form } from "react-bootstrap";

const ModalDialog = () => {
  const { 
    showModal, 
    handleModal, 
    httpEndpoint,
    setHTTPEndpoint,
    wsEndpoint, 
    setWsEndpoint, 
    securityToken,
    setSecurityToken 
  } = useStateContext();

  return (
    <Modal
      show={showModal}
      onHide={handleModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header >
        <Modal.Title>Fill the required fields to play</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>WS Endpoint</Form.Label>
          <Form.Control
            type="text"
            name="wsEndpoint"
            placeholder={wsEndpoint}
            value={wsEndpoint}
            onChange={(e) => setWsEndpoint(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>HTTP Endpoint</Form.Label>
          <Form.Control
            type="text"
            name="httpEndpoint"
            placeholder={httpEndpoint}
            value={httpEndpoint}
            onChange={(e) => setHTTPEndpoint(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Security Token</Form.Label>
          <Form.Control
            type="text"
            name="securityToken"
            placeholder={securityToken}
            value={securityToken}
            onChange={(e) => setSecurityToken(e.target.value)}
          />
        </Form.Group>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDialog;
