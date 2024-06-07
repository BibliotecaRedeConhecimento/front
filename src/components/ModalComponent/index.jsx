//testando a aplicação de um modal

import {Button, Modal, Row} from 'react-bootstrap';
import { ButtonModalStyle } from '../ButtonModal/styles';



function ModalComponent({show, handleClose, bodyContent}) {
 
 
 
 
  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
    
        <Modal show={show} onHide={handleClose} size='sm' centered >
      <Modal.Header style={{backgroundColor: '#013D32', height: '4rem'}} >
        
      </Modal.Header>
      <Modal.Body style={{ borderBottom: 'none' , display: 'flex', justifyContent: 'center' }}>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer style={{ borderTop: 'none', display: 'flex', justifyContent: 'space-between' }}>
        <Row>
        <Button variant="dark" onClick={handleClose} >
          Cancelar 
        </Button>
        </Row>
        <Row>
        <Button  onClick={handleClose} style={{backgroundColor: '#013D32'}}>
          Cadastrar </Button>
        </Row>
      </Modal.Footer>
    </Modal>
    
    </div>
  );
}

export default ModalComponent;
