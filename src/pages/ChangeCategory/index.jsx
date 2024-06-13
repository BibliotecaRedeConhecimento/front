import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";


import { MdOutlineAddCircle } from "react-icons/md";

import { Form } from "react-bootstrap"

import "react-toastify/dist/ReactToastify.css";

import ModalComponent from "../../components/ModalComponent";


import { getCategoryById, updateCategory } from "../../servicesBack/CategoryServices";
import ButtonModal from "../../components/ButtonModal";


function ChangeCategory({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
    const { id }  = useParams()


    console.log(id)
    
      const [showModal, setShowModal] = useState(false);
      const [categoryName, setCategoryName] = useState()
    
      const [namePlaceholder, setNamePlaceholder] = useState()
    
      const handleOpenModal = () => { setShowModal(true);};
    
      const handleCloseModal = () => { setShowModal(false);};
    
      const handleEdit = async() =>{
        const response = await updateCategory(id, {
          name: categoryName
        })
    
        console.log(response)
      }
    
      const handleName = async() =>{
        const response = await getCategoryById(id)
        setNamePlaceholder(response.data.name)
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
        <PageHeaderContainer icon={<MdOutlineAddCircle style={{width: 34, marginRight: 5}} />} title={`Alterar Categoria`} />
        <PageContentContainer>

        <Form.Group controlId="NameCategory">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string" placeholder={namePlaceholder} onChange={(event) => setCategoryName(event.target.value)}/>
             
            </Form.Group>

            <ButtonModal buttonText="Confirmar Cadastro" onClick={handleOpenModal}/>

            <ModalComponent bodyContent={'Deseja cadastrar a Categoria?'} show={showModal} handleClose={handleCloseModal}  confirm={handleEdit}/>   
         

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ChangeCategory;