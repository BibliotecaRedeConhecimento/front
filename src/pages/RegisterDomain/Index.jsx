// eslint-disable-next-line no-unused-vars
import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap";
import ButtonModal from "../../components/ButtonModal";
import ModalComponent from "../../components/ModalComponent";
import { useState } from "react";
import { addDomain } from "../../services/DomainServices";

const RegisterDomain = () => {
  const [showModal, setShowModal] = useState(false);
  const [domainName, setDomainName] = useState();
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const registerDomain = async (event) => {
    event.preventDefault();
    const response = await addDomain({
      name: domainName,
    });
    console.log(response);
  };

  return (
    <div className="col">
      <PageContainer>
        <PageHeaderContainer title="Cadastrar Domínio" />
        <PageContentContainer>
          <Form.Group controlId="NameDomain">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="string"
              tabIndex="1"
              placeholder="Nome do Domínio"
              onChange={(event) => setDomainName(event.target.value)}
            />
          </Form.Group>

          <ButtonModal tabIndex="2"
            buttonText="Confirmar Cadastro"
            onClick={handleOpenModal}
          />

          <ModalComponent tabIndex="-1"
            bodyContent={"Deseja cadastrar o Domínio?"}
            show={showModal}
            handleClose={handleCloseModal}
            confirm={registerDomain}
          />
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default RegisterDomain;
