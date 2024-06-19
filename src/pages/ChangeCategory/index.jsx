import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";


import { MdOutlineAddCircle } from "react-icons/md";

import { Form } from "react-bootstrap"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalComponent from "../../components/ModalComponent";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { getCategoryById, updateCategory } from "../../servicesBack/CategoryServices";
import ButtonModal from "../../components/ButtonModal";
import ButtonComponent from "../../components/ButtonBack";
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";
import { getAllDomains } from "../../servicesBack/DomainServices";



function ChangeCategory({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { id } = useParams()


  console.log(id)

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState()
  const [domain, setDomain] = useState([])
const [domainId, setDomainId]= useState()

  const handleOpenModal = () => { setShowModal(true); };

  const handleCloseModal = () => { setShowModal(false); };

  const handleEdit = async () => {
    const response = await updateCategory(id, { name: categoryName, active: true });
    if (response) {
      toast.success("categoria alterado com sucesso!");

      handleCloseModal();
    } else {
      toast.error("Erro ao alterar a categoria.");
    }


  }

  useEffect(() => {

    const fetchDomains = async () => {
      const response = await getAllDomains()
      setDomain(response.data.content)
    }
    fetchDomains()
  }, [])


  const handleName = async () => {
    const response = await getCategoryById(id)
    setCategoryName(response.data.name)
    console.log(response)
  }

  useEffect(() => {
    handleName()
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
        <PageHeaderContainer icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />} title={`Alterar Categoria`} />
        <PageContentContainer>

          <Form.Group controlId="NameCategory">

            <Form.Label>Nome</Form.Label>
            <Form.Control type="string" onChange={(event) => setCategoryName(event.target.value)} value={categoryName} />
          </Form.Group>
          <Form.Group controlId="domain">

            <Form.Label>Dominio</Form.Label>
            <Form.Control  as="select"
              value={domainId}
              onChange={handleChange} />
          </Form.Group>
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
              alternativeText="Confirmar alteração"
              action={handleOpenModal} >

              Alterar
              <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />


            </ButtonConfirmRegistration>


          </div>





          <ModalComponent
            tabIndex="-1"
            bodyContent={"Deseja alterar a Categoria?"}
            show={showModal}
            handleClose={() => {
              handleCloseModal();
              toast.error("Alteração de categoria cancelada.");
            }}
            confirm={handleEdit}
            cancel={() => {
              handleCloseModal();
              toast.error("Alteração de categoria cancelada.");
            }}
          />


        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ChangeCategory;