import { React } from "react";

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
        <PageHeaderContainer title={`Menu de Conhecimento`} />
        <PageContentContainer>

          <ButtonRoutes buttonText="Cadastrar Conhecimento" onClick={() => navigateTo("/cadastrarConhecimento")} />
          <ButtonRoutes buttonText="Buscar Conhecimento" onClick={() => navigateTo("/buscarConhecimento")} />

          <ButtonComponent

            size="10rem"
            bgColor="#585859"
            textColor="white"
            alternativeText="Voltar"
          >
            <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
            Voltar
          </ButtonComponent>

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default HomeKnowledge;