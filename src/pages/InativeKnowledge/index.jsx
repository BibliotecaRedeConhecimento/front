import { React, useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";

import { IoIosArrowBack } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

import { getAllKnowledges } from "../../servicesBack/KnowledgeServices";

import ButtonComponent from "../../components/ButtonBack";
import TableInativeKnowledge from "../../components/TableInativeKnowledge";

function InativeKnowledge({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {

    const [knowledgeData, setKnowledgeData] = useState([])

    const fetchKnowledges = async() => {
    const response = await getAllKnowledges()
    setKnowledgeData(response.data.content)
    console.log(response.data.content)
    }
    
    useEffect(() => {
      fetchKnowledges()
    }, [])

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
        icon={<TfiMenuAlt style={{width: 34, marginRight: 5}} />} 
        title={`Conhecimento Inativo`}
        buttonback={
          <ButtonComponent
            size="8rem"
            //bgColor="var(--cinza-primario)"
            textColor="white"
            alternativeText="Voltar"
          ></ButtonComponent>
        }
         />
         <PageContentContainer scrollable={true}>

         <TableInativeKnowledge knowledge={knowledgeData}/>

         
         

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default InativeKnowledge;