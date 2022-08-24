import { useStateContext } from '../context/StateContext';

import { Modal, Button, Form } from "react-bootstrap";


const ModalConnect = () => {
    const { 
      showModalConnect, 
      handleModalConnect, 
      setEnemyAddress,
      enemyAddress,
      joinBattle
    } = useStateContext();
  
    return (
      <Modal
        show={showModalConnect}
        onHide={handleModalConnect}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Fill the enemy address to connect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
              <Form.Control  
                value={enemyAddress}
                onChange={(e)=>{setEnemyAddress(e.target.value)}}
                className="mb-2"
              />
              <Button variant='primary' onClick={joinBattle}>Connect</Button>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalConnect}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default ModalConnect;