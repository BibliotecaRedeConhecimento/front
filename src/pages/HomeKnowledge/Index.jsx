import {React, useContext} from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import {ContainerWithSidebar} from "../../components/ContainerWithSidebar";
import ButtonRoutes from "../../components/ButtonRoutes";
import {useNavigate} from "react-router-dom";

import {IoIosArrowBack} from "react-icons/io";
import ButtonComponent from "../../components/ButtonBack";
import {AuthenticationContext} from "../../services/context/AuthContext";

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
                <PageHeaderContainer title={`Menu de Conhecimento`}/>
                <PageContentContainer width="100%" flexDirection='column' justifyContent='center' alignItems='center'
                                      display='flex'>

<<<<<<< Updated upstream
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
        <PageContentContainer width="100%" flexDirection= 'column' justifyContent='center' alignItems='center' display='flex' >
=======
                    <ButtonRoutes buttonText="Cadastrar Conhecimento"
                                  onClick={() => navigateTo("/cadastrarConhecimento")}/>
                    <ButtonRoutes buttonText="Buscar Conhecimento" onClick={() => navigateTo("/buscarConhecimento")}/>
>>>>>>> Stashed changes

                    <ButtonComponent

<<<<<<< Updated upstream
          

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
=======
                        size="10rem"
                        bgColor="var(--cinza-primario)"
                        textColor="white"
                        alternativeText="Voltar"
                    >
                        <IoIosArrowBack style={{marginRight: 5, width: 12}}/>
                        Voltar
                    </ButtonComponent>

                </PageContentContainer>
            </PageContainer>
        </ContainerWithSidebar>
    );
>>>>>>> Stashed changes
}

export default HomeKnowledge;