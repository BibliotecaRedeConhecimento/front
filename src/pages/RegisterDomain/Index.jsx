import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"
import ButtonModal from "../../components/ButtonModal";
import ModalComponent from "../../components/ModalComponent";
import { useState } from "react";

const RegisterDomain = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => { setShowModal(true);};

    const handleCloseModal = () => { setShowModal(false);};

    return (
        <div className="col">
        <PageContainer>
          <PageHeaderContainer title='Cadastrar Domínio'/>
          <PageContentContainer>

         
            <Form.Group controlId="NameDomain">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string" placeholder="Nome do Domínio" />
             
            </Form.Group>
            
            <ButtonModal buttonText="Confirmar Cadastro" onClick={handleOpenModal}/>

            <ModalComponent bodyContent={'Deseja cadastrar o Domínio?'} show={showModal} handleClose={handleCloseModal}/>
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
      </div>
    );
};

export default RegisterDomain;