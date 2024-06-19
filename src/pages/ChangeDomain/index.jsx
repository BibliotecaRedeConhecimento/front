import { React, useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { MdOutlineAddCircle } from "react-icons/md";
import { Button, Form } from "react-bootstrap"
import "react-toastify/dist/ReactToastify.css";
import ModalComponent from "../../components/ModalComponent";
import ButtonModal from "../../components/ButtonModal";
import { useParams } from "react-router-dom";
import { getDomainById, updateDomain } from "../../servicesBack/DomainServices";
import ButtonComponent from "../../components/ButtonBack";  
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";







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
      
      const response = await updateDomain(id, {name: domainName, active: true});
      if (response) {
        toast.success("Domínio alterado com sucesso!");
        
        handleCloseModal();
      } else {
        toast.error("Erro ao alterar o domínio.");
      }

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
              bodyContent={"Deseja alterar o Domínio?"}
              show={showModal}
              handleClose={() => {
                handleCloseModal();
                toast.error("Alteração de domínio cancelada.");
              }}
              confirm={handleEdit}
              cancel={() => {
                handleCloseModal();
                toast.error("Alteração de domínio cancelada.");
              }}
            />
            

            

                </PageContentContainer>
            </PageContainer>
        </ContainerWithSidebar>
    );
}

export default ChangeDomain;