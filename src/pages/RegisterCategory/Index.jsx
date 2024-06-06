import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"

const RegisterCategory = () => {
  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Cadastrar Categoria'/>
          <PageContentContainer>

          <Form.Group controlId="NameCategory">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string" placeholder="Insira a categoria" />
             
            </Form.Group>

        
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default RegisterCategory;
