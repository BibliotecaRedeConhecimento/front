import React, { useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";

import { Form, Row, Col } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalComponent from "../../components/ModalComponent";
import ButtonComponent from "../../components/ButtonBack";
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";

import { addCategory } from "../../servicesBack/CategoryServices";

const RegisterCategory = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ categoryName: "" });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleOpenModal = () => {
    const form = document.getElementById("categoryForm");
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error("O campo é obrigatório!");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    toast.error("Cadastro de categoria cancelado.");
  };

  const registerCategory = async (event) => {
    event.preventDefault();
    const response = await addCategory({
      name: formData.categoryName,
    });
    if (response) {
      toast.success("Categoria cadastrada com sucesso!");
      setShowModal(false);
    } else {
      toast.error("Erro ao cadastrar a categoria.");
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
      <PageContainer>
        <PageHeaderContainer
          icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />}
          title={`Cadastrar Categoria`}
        />
        <PageContentContainer>
          <Form id="categoryForm" noValidate validated={validated} onSubmit={registerCategory}>
            <Row>
              <Col md={12}>
                <Form.Group controlId="categoryName" className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira a categoria"
                    value={formData.categoryName}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.categoryName}
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
          <ModalComponent
            bodyContent={"Deseja cadastrar a Categoria?"}
            show={showModal}
            handleClose={handleCloseModal}
            confirm={registerCategory}
          />
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
};

export default RegisterCategory;
