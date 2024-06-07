// Aqui vai conter os botões que levam para as pages: RegisterKnowledge e SearchKnowledge

import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import ButtonRoutes from "../../components/ButtonRoutes";

const HomeKnowledge = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="col">
        <PageContainer>
          <PageHeaderContainer title='Bem-Vindo, Fulano!'/>
          <PageContentContainer width="100%" height="100vh" flexDirection= 'column' justifyContent='center' alignItems='center'>
         
          <ButtonRoutes buttonText="Cadastrar Conhecimento" onClick={() => navigateTo("/registerKnowledge")} /> 
          <ButtonRoutes buttonText="Buscar Dominio" onClick={() => navigateTo("/SearchKnowledge")} />
          
           
           
           
         </PageContentContainer>
        </PageContainer>
      </div>
  );
};

export default HomeKnowledge;
