// Aqui vai conter os botões que levam para as pages: RegisterDomain e SearchDomain

import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import ButtonRoutes from "../../components/ButtonRoutes";

const HomeDomain = () => {

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    }

    return (
      <div className="container-fluid">
          
      <div className="col">
        <PageContainer>
          <PageHeaderContainer title='Menu Domínio'/>
          <PageContentContainer width="100%" height="88vh"  flexDirection= 'column' justifyContent='center' alignItems='center' display='flex'>
         
          <ButtonRoutes buttonText="Cadastrar Dominio" onClick={() => navigateTo("/registerDomain")} /> 
          <ButtonRoutes buttonText="Buscar Dominio" onClick={() => navigateTo("/SearchDomain")} />
          
           
           
           
         </PageContentContainer>
        </PageContainer>
      </div>
  </div>
    );
};

export default HomeDomain;