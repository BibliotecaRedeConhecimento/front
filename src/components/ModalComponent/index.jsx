//testando a aplicação de um modal

import {Button, Modal, Row} from 'react-bootstrap';
import { ButtonModalStyle } from '../ButtonModal/styles';



function ModalComponent({show, handleClose, bodyContent, confirm, confirmButton = 'Cadastrar', cancel,cancelButton = 'Cancelar'}) {
 
 
 
 
  return (
    <div
      style={{ display: 'block', position: 'initial', border: 'none' }}
    >
    
        <Modal  show={show} onHide={handleClose} centered size='sm'  >
          
      <Modal.Header style={{backgroundColor:  `var(--verde-primario)`,height: '4rem', border: 'none'}} >
        
      </Modal.Header>
      <Modal.Body style={{ borderBottom: 'none' , display: 'flex', justifyContent: 'center', color: `var(--preto-primario2)` , textAlign: 'center'}}>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer style={{ borderTop: 'none', display: 'flex', justifyContent: 'space-between',  }}>
        <Row>
        <Button onClick={cancel} style={{backgroundColor: `var(--cinza-secundario)`, border: 'none'}}>
          {cancelButton}
        </Button>
        </Row>
        <Row>
      <Button  onClick={confirm} style={{backgroundColor: `var(--verde-primario)`, border: 'none'}}>
          {confirmButton} </Button>
        </Row>
      </Modal.Footer>
    </Modal>
    
    </div>
  );
}

export default ModalComponent;
