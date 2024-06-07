import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"

const RegisterKnowledge = () => {
  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Cadastrar Conhecimento'/>
          <PageContentContainer>

          <Form.Group controlId="NameKnowledge">
              <Form.Label>Título</Form.Label>
              <Form.Control type="string" placeholder="como autenticar..." />
             
            </Form.Group>

            

        
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default RegisterKnowledge;
