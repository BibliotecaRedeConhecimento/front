import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"
import { useState } from "react";
import ButtonModal from "../../components/ButtonModal";
import ModalComponent from "../../components/ModalComponent";


const RegisterCategory = () => {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => { setShowModal(true);};

  const handleCloseModal = () => { setShowModal(false);};

  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Cadastrar Categoria'/>
          <PageContentContainer >

          <Form.Group controlId="NameCategory">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string" placeholder="Insira a categoria" />
             
            </Form.Group>

            <ButtonModal buttonText="Confirmar Cadastro" onClick={handleOpenModal}/>

            <ModalComponent bodyContent={'Deseja cadastrar a Categoria?'} show={showModal} handleClose={handleCloseModal}/>

        
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default RegisterCategory;
