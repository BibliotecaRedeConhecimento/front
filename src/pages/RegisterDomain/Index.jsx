import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"

const RegisterDomain = () => {
    return (
        <div className="col">
        <PageContainer>
          <PageHeaderContainer title='Cadastrar Domínio'/>
          <PageContentContainer>

         
            <Form.Group controlId="NameDomain">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="string" placeholder="Nome do Domínio" />
             
            </Form.Group>
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
      </div>
    );
};

export default RegisterDomain;