import { React, useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";

import { IoIosArrowBack } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

import { getAllDomains } from "../../servicesBack/DomainServices";

import ButtonComponent from "../../components/ButtonBack";
import TableInativeDomain from "../../components/TableInativeDomain";

function InativeDomain({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {

  const [domainData, setDomainData] = useState([]);

  const fetchDomains = async () => {
    const response = await getAllDomains()
  setDomainData(response.data.content)
  console.log(response.data.content)
  };

useEffect(() => {
  fetchDomains()
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
        icon={<TfiMenuAlt style={{width: 34, marginRight: 15}} />} 
        title={`Domínios Inativos`}
        buttonback={
          <ButtonComponent
            size="8rem"
            //bgColor="var(--cinza-primario)"
            textColor="white"
            alternativeText="Voltar"
          ></ButtonComponent>
        } />
         <PageContentContainer scrollable={true}>

         <TableInativeDomain domain={domainData}/>

         
         

        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default InativeDomain;