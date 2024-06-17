import React, { useEffect, useState } from "react";

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
import { getAllDomains } from "../../servicesBack/DomainServices";

const RegisterCategory = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ categoryName: "", domainId: 0 });
  const [validated, setValidated] = useState(false);
  const [domains, setDomains] = useState([])

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "domainId") {
      setFormData({ ...formData, [id]: Number(value) });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleOpenModal = (event) => {
    event.preventDefault();
    
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
    
  };

  const registerCategory = async (event) => {
    event.preventDefault();
    const response = await addCategory({name: formData.categoryName, domains: [{
        id: formData.domainId
      }]
    });
    if (response) {
      toast.success("Domínio cadastrado com sucesso!");
      
      handleCloseModal();
    } else {
      toast.error("Erro ao cadastrar o domínio.");
    }
  

    
  };

  const fetchDomains = async () => {
    const resp = await getAllDomains()
    setDomains(resp.data.content)
  }

  useEffect(() => {
    fetchDomains()
  }, [])

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
                <Form.Group controlId="domainId" className="mb-3">
                  <Form.Label>Selecione um Domínio</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.domainId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um Domínio</option>
                    {domains.map((domain) => (
                      <option key={domain.id} value={domain.id}>{domain.name}</option>
                    ))}
                  </Form.Control>
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
                  type="button"
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
              bodyContent={"Deseja cadastrar a categoria??"}
              show={showModal}
              handleClose={() => {
                handleCloseModal();
                toast.error("Cadastro de categoria cancelado.");  
              }}
              confirm={registerCategory}
              cancel={() => {
                handleCloseModal();
                toast.error("Cadastro de categoria cancelado.");  
              }}
            />
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
};

export default RegisterCategory;
