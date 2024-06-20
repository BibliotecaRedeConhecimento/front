import { React, useContext } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import ButtonRoutes from "../../components/ButtonRoutes";
import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import ButtonComponent from "../../components/ButtonBack";
import { AuthenticationContext } from "../../services/context/AuthContext";

function HomeDomain({
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

  const { isManager } = useContext(AuthenticationContext);

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer
          title={`Menu de Domínio`}
          buttonback={
            <ButtonComponent
              size="8rem"
              //bgColor="var(--cinza-primario)"
              textColor="white"
              alternativeText="Voltar"
            ></ButtonComponent>
          }
        />
        <PageContentContainer
          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          {isManager() ? (
            <ButtonRoutes
              buttonText="Cadastrar Domínio"
              onClick={() => navigateTo("/cadastrarDominio")}
            />
          ) : null}

          <ButtonRoutes
            buttonText="Buscar Domínio"
            onClick={() => navigateTo("/buscarDominio")}
          />

          
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default HomeDomain;
