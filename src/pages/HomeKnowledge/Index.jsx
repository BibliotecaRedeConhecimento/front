import { React, useContext } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import ButtonRoutes from "../../components/ButtonRoutes";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import ButtonComponent from "../../components/ButtonBack";

function HomeKnowledge({
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

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer title={`Menu de Conhecimento`} buttonback={
          <ButtonComponent
            size="8rem"
            //bgColor="var(--cinza-primario)"
            textColor="white"
            alternativeText="Voltar"
          ></ButtonComponent>
        } />
        <PageContentContainer width="100%" flexDirection='column' justifyContent='center' alignItems='center' display='flex' >

          <ButtonRoutes buttonText="Cadastrar Conhecimento" onClick={() => navigateTo("/cadastrarConhecimento")} />
          <ButtonRoutes buttonText="Buscar Conhecimento" onClick={() => navigateTo("/buscarConhecimento")} />

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default HomeKnowledge;