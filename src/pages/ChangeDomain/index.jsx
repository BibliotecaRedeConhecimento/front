import { React, useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";

import { MdOutlineAddCircle } from "react-icons/md";

import { Form } from "react-bootstrap"


import "react-toastify/dist/ReactToastify.css";

import ModalComponent from "../../components/ModalComponent";
import ButtonModal from "../../components/ButtonModal";

import { useParams } from "react-router-dom";

import { getDomainById, updateDomain } from "../../servicesBack/DomainServices";
import ButtonComponent from "../../components/ButtonBack";  
import { IoIosArrowBack } from "react-icons/io";  







function ChangeDomain({
    HandledarkMode,
    isDarkMode,
    decreaseFontSize,
    increaseFontSize,
    logOut,
}) {

    const { id } = useParams();

    console.log(id);
  
    const [showModal, setShowModal] = useState(false);
    const [domainName, setDomainName] = useState("");
  
    const [namePlaceholder, setNamePlaceholder] = useState();
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleEdit = async (event) => {
      event.preventDefault()
      const response = await updateDomain(id, {
        name: domainName,
        active: true
      }
      );
      const resp = await getDomainById(id)
      console.log(response.data);
      console.log(resp.data)
      handleCloseModal()
    };
  
    const handleName = async () => {
      const response = await getDomainById(id);
      setNamePlaceholder(response.data.name);
    };
  
    useEffect(() => {
      handleName();
    }, []);

    return (
        <ContainerWithSidebar
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={logOut}
        >
            <PageContainer>
                <PageHeaderContainer icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />} title={`Alterar Domínio`} />
                <PageContentContainer>

                <Form.Group controlId="NameDomain">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="string"
              placeholder={namePlaceholder}
              onChange={(event) => setDomainName(event.target.value)}
            />
          </Form.Group>
          <ButtonModal
            buttonText="Confirmar Alteração"
            onClick={handleOpenModal}
          />
          <ButtonComponent
              size="10rem"
              bgColor="var(--cinza-primario)"
              textColor="white"
              alternativeText="Voltar"
            >
              <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
              Voltar
            </ButtonComponent>     
                  

          <ModalComponent
            bodyContent={"Deseja alterar o Dominio?"}
            show={showModal}
            handleClose={handleCloseModal}
            confirm={handleEdit}
            confirmButton = 'Alterar'
          />

                </PageContentContainer>
            </PageContainer>
        </ContainerWithSidebar>
    );
}

export default ChangeDomain;