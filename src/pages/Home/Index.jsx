import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import '../../Global.css'

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { useNavigate } from "react-router-dom";
import ButtonRoutes from "../../components/ButtonRoutes";
import { CgHome } from "react-icons/cg";


const Home = () => {
  const navigate = useNavigate();

const navigateTo = (path) => {
  navigate(path);
 };

  

  return (
    <div className="container-fluid">
          
        <div className="col">
          <PageContainer>
            <PageHeaderContainer icon={<CgHome style={{width: 34, marginRight: 5}} />} title='Sistema Biblioteca'
            
            />
            <PageContentContainer width="100%" height="88vh" flexDirection= 'column' justifyContent='center' alignItems='center' display='flex' >
           
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

