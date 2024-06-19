import { React } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import ButtonRoutes from "../../components/ButtonRoutes";
import { useNavigate } from "react-router-dom";

import { CgHome } from "react-icons/cg";

function TelaBiblioteca({
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
        <PageHeaderContainer  icon={<CgHome style={{width: 34, marginRight: 5}} />} title={`Sistema Biblioteca`} />
        <PageContentContainer width="100%" flexDirection= 'column' justifyContent='center' alignItems='center' display='flex' >

          <ButtonRoutes buttonText="Domínio" onClick={() => navigateTo("/menuDominio")} />
          <ButtonRoutes buttonText="Categoria" onClick={() => navigateTo("/menuCategoria")} />
          <ButtonRoutes buttonText="Conhecimento" onClick={() => navigateTo("/menuConhecimento")} />

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default TelaBiblioteca;