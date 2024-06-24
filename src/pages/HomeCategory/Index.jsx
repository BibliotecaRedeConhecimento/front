import {React, useContext} from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import ButtonRoutes from "../../components/ButtonRoutes";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonBack";

import { IoIosArrowBack } from "react-icons/io";
import {AuthenticationContext} from "../../services/context/AuthContext";

function HomeCategory({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
   };
  const {isManager} = useContext(AuthenticationContext)

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer title={`Menu de Categoria`} buttonback={
            <ButtonComponent
              size="8rem"
              //bgColor="var(--cinza-primario)"
              textColor="white"
              alternativeText="Voltar"
            ></ButtonComponent>
          }/>
        <PageContentContainer width="100%" flexDirection= 'column' justifyContent='center' alignItems='center' display='flex' >

          { isManager() ?
              <ButtonRoutes buttonText="Cadastrar Categoria" alternativeText="Cadastrar Categoria" onClick={() => navigateTo("/cadastrarCategoria")} />
              : null
          }

          <ButtonRoutes buttonText="Buscar Categoria" alternativeText="Buscar Categoria" onClick={() => navigateTo("/buscarCategoria")} />

                 

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default HomeCategory;