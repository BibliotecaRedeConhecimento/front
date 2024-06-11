//testando a aplicação de um modal

import {Button, Modal, Row} from 'react-bootstrap';
import { ButtonModalStyle } from '../ButtonModal/styles';



function ModalComponent({show, handleClose, bodyContent, confirm}) {
 
 
 
 
  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
    
        <Modal show={show} onHide={handleClose} size='sm' centered >
      <Modal.Header style={{backgroundColor:  `var(--verde-primario)`, height: '4rem'}} >
        
      </Modal.Header>
      <Modal.Body style={{ borderBottom: 'none' , display: 'flex', justifyContent: 'center' }}>
        {bodyContent}
      </Modal.Body>
      <Modal.Footer style={{ borderTop: 'none', display: 'flex', justifyContent: 'space-between' }}>
        <Row>
        <Button variant="dark" onClick={handleClose} style={{backgroundColor: `var(--cinza-primario)`}}>
          Cancelar 
        </Button>
        </Row>
        <Row>
      <Button  onClick={confirm} style={{backgroundColor: `var(--verde-primario)`}}>
          Cadastrar </Button>
        </Row>
      </Modal.Footer>
    </Modal>
    
    </div>
  );
}

export default ModalComponent;
