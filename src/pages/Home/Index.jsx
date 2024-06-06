import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import '../../Global.css'

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/TableInativeCategory";
// import  Modal  from "../../components/Modal";
import ButtonRoutes from "../../components/ButtonRoutes";


const Home = () => {
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
           
            <ButtonRoutes buttonText="Domínio" onClick={() => navigateTo("/homeDomain")} /> 
            <ButtonRoutes buttonText="Categoria" onClick={() => navigateTo("/homeCategory")} />
            <ButtonRoutes buttonText="Conhecimento" onClick={() => navigateTo("/homeKnowledge")}/>
             
             
             
           </PageContentContainer>
          </PageContainer>
        </div>
    </div>
  );
};

export default Home;

