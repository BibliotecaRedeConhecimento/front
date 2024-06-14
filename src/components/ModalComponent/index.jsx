//testando a aplicação de um modal

import {Button, Modal, Row} from 'react-bootstrap';
import { ButtonModalStyle } from '../ButtonModal/styles';



function ModalComponent({show, handleClose, bodyContent, confirm, confirmButton = 'Cadastrar'}) {
 
 
 
 
  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
    
        <Modal  show={show} onHide={handleClose} centered size='sm' >
          
      <Modal.Header style={{backgroundColor:  `var(--verde-primario)`,height: '4rem'}} >
        
      </Modal.Header>
      <Modal.Body style={{ borderBottom: 'none' , display: 'flex', justifyContent: 'center', color: `var(--preto-primario)` , }}>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer style={{ borderTop: 'none', display: 'flex', justifyContent: 'space-between',  }}>
        <Row>
        <Button onClick={handleClose} style={{backgroundColor: `var(--cinza-primario)`}}>
          Cancelar 
        </Button>
        </Row>
        <Row>
      <Button  onClick={confirm} style={{backgroundColor: `var(--verde-primario)`}}>
          {confirmButton} </Button>
        </Row>
      </Modal.Footer>
    </Modal>
    
    </div>
  );
}

export default ModalComponent;
