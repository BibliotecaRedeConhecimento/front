import React, { useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"
import { useState } from "react";
import ButtonModal from "../../components/ButtonModal";
import ModalComponent from "../../components/ModalComponent";
import { addCategory, getCategoryById, updateCategory } from "../../services/CategoryServices";
import { useParams } from "react-router-dom";


const ChangeCategory = () => {

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
    <div>
      <PageContainer>
          <PageHeaderContainer title='Alterar Categoria'/>
          <PageContentContainer >

          <Form.Group controlId="NameCategory">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string" placeholder={namePlaceholder} onChange={(event) => setCategoryName(event.target.value)}/>
             
            </Form.Group>

            <ButtonModal buttonText="Confirmar Cadastro" onClick={handleOpenModal}/>

            <ModalComponent bodyContent={'Deseja cadastrar a Categoria?'} show={showModal} handleClose={handleCloseModal}  confirm={handleEdit}/>

        
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default ChangeCategory;
