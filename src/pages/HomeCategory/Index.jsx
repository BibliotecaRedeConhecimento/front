// Aqui vai conter os botões que levam para as pages: RegisterCategory e SearchCategory

import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import ButtonRoutes from "../../components/ButtonRoutes";

const HomeCategory = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className="container-fluid">
          
        <div className="col">
          <PageContainer>
            <PageHeaderContainer title='Bem-Vindo, Fulano!'/>
            <PageContentContainer>
           
            <ButtonRoutes buttonText="Cadastrar Categoria" onClick={() => navigateTo("/registerCategory")} /> 
            <ButtonRoutes buttonText="Buscar Categoria" onClick={() => navigateTo("/SearchCategory")} />
            
             
             
             
           </PageContentContainer>
          </PageContainer>
        </div>
    </div>
  );
};

export default HomeCategory;
