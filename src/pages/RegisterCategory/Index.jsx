import { React, useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";

import { Form } from "react-bootstrap"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalComponent from "../../components/ModalComponent";
import ButtonComponent from "../../components/ButtonBack";
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";

import { addCategory } from "../../servicesBack/CategoryServices";


function RegisterCategory({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {

    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState()
    const handleOpenModal = () => { setShowModal(true);};
  
    const handleCloseModal = () => {
      setShowModal(false);
      toast.error("Cadastro de categoria cancelado.");
    };
  
    const registerCategory = async (event) => {
      event.preventDefault();
      const response = await addCategory({
        name: categoryName,
      });
      console.log(response);
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
        <PageHeaderContainer icon={<MdOutlineAddCircle style={{width: 34, marginRight: 5}} />} title={`Cadastrar Categoria`} />
        <PageContentContainer>

        <Form.Group controlId="NameCategory">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string"
              placeholder="Insira a categoria"
              required
              />
             
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
              action={handleOpenModal}
            >
              Cadastrar
              <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
            </ButtonConfirmRegistration>
          </div>

            <ModalComponent
            bodyContent={'Deseja cadastrar a Categoria?'}
            show={showModal}
            handleClose={handleCloseModal}
            confirm={registerCategory}
            />
         

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default RegisterCategory;