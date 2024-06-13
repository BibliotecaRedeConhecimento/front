import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap";
import ModalComponent from "../../components/ModalComponent";
import { addDomain } from "../../services/DomainServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/ButtonBack";
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import ButtonModal from "../../components/ButtonModal";

const RegisterDomain = () => {
  const [showModal, setShowModal] = useState(false);
  const [domainName, setDomainName] = useState('');
  const [validated, setValidated] = useState(false);

  const handleOpenModal = () => {
    if (!domainName) {
      toast.error("Nome do domínio é obrigatório!");
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    toast.error("Cadastro de domínio cancelado.");
  };

  const registerDomain = async (event) => {
    event.preventDefault();
    if (!domainName) {
      toast.error("Nome do domínio é obrigatório!");
      return;
    }
    const response = await addDomain({
      name: domainName,
    });
    if (response) {
      toast.success("Domínio cadastrado com sucesso!");
      setShowModal(false);
    } else {
      toast.error("Erro ao cadastrar o domínio.");
    }
  };

  return (
    <div className="col">
      <PageContainer>
        <PageHeaderContainer icon={<MdOutlineAddCircle style={{width: 34, marginRight: 5}} />} title="Cadastrar Domínio" />
        <PageContentContainer>
          <Form noValidate validated={validated} onSubmit={registerDomain}>
            <Form.Group controlId="NameDomain">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                tabIndex="1"
                placeholder="Nome do Domínio"
                value={domainName}
                onChange={(event) => setDomainName(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Campo obrigatório.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <ButtonComponent
                size="10rem"
                bgColor="#585859"
                textColor="white"
                alternativeText="Voltar"
              >
                <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
                Voltar
              </ButtonComponent>
              <ButtonConfirmRegistration
                size="10rem"
                bgColor="#013d32"
                textColor="white"
                alternativeText="Cadastrar"
                onClick={handleOpenModal}
              >
                Cadastrar
                <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
              </ButtonConfirmRegistration>
            </div>
          </Form>


          <ModalComponent tabIndex="-1"
            bodyContent={"Deseja cadastrar o Domínio?"}
            show={showModal}
            handleClose={handleCloseModal}
            confirm={registerDomain}
          />
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </div>
  );
};

export default RegisterDomain;