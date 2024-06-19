import React, { useState } from 'react';
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from '../../components/ContainerWithSidebar';
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import ButtonComponent from '../../components/ButtonBack';
import ButtonConfirmRegistration from '../../components/ButtonConfirmRegistration';
import ModalComponent from '../../components/ModalComponent';
import { addDomain } from '../../servicesBack/DomainServices';

const RegisterDomain = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) => {
  const [formData, setFormData] = useState({ domainName: "" });
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
  };

  const handleOpenModal = (event) => {
    event.preventDefault();
    const form = document.getElementById("domainForm");
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error("O campo é obrigatório!");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {

    
    setShowModal(false);
    
 
  };

  const registerDomain = async (event) => {
    event.preventDefault();
    const response = await addDomain({ name: formData.domainName });
    if (response) {
      toast.success("Domínio cadastrado com sucesso!");
      
      handleCloseModal();
    } else {
      toast.error("Erro ao cadastrar o domínio.");
    }
  };

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <div>
        <PageContainer>
          <PageHeaderContainer
            icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />}
            title="Cadastrar Domínio"
          />
          <PageContentContainer>
            <Form id="domainForm" noValidate validated={validated} onSubmit={handleOpenModal}>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="domainName" className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome do Domínio"
                      value={formData.domainName}
                      onChange={handleChange}
                      required
                      isInvalid={validated && !formData.domainName}
                      style={{backgroundColor: "var(--branco-primario2)"}}
                    />
                    <Form.Control.Feedback type="invalid">
                      Campo obrigatório.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-between mt-3">
                <ButtonComponent
                  size="10rem"
                  bgColor="var(--cinza-primario)"
                  textColor="white"
                  alternativeText="Voltar"
                >
                  <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
                  Voltar
                </ButtonComponent>
                <ButtonConfirmRegistration
                  size="10rem"
                  bgColor="var(--verde-primario)"
                  
                  alternativeText="Cadastrar"
                  onClick={handleOpenModal}
                >
                  Cadastrar
                  <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
                </ButtonConfirmRegistration>
              </div>
              
            </Form>
            <ModalComponent
              tabIndex="-1"
              bodyContent={"Deseja cadastrar o Domínio?"}
              show={showModal}
              handleClose={() => {
                handleCloseModal();
                toast.error("Cadastro de domínio cancelado.");  
              }}
              confirm={registerDomain}
              cancel={() => {
                handleCloseModal();
                toast.error("Cadastro de domínio cancelado.");  
              }}
            />
          </PageContentContainer>
        </PageContainer>
        
      </div>
    </ContainerWithSidebar>
  );
};

export default RegisterDomain;
