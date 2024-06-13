import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap";
import TableDomain from "../../components/TableDomain";
import { getAllDomains } from "../../services/DomainServices";
import ButtonComponent from "../../components/ButtonBack";
import { IoIosArrowBack } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

const SearchDomain = () => {
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
    <div>
      <PageContainer>
        <PageHeaderContainer  icon={<TfiMenuAlt style={{width: 34, marginRight: 5}} />} title="Buscar Domínio" />
        <PageContentContainer>
          <TableDomain domain={domainData}/>
          <div style={{marginTop: 20}}>
          <ButtonComponent
           size="10rem"
           bgColor="var(--cinza-primario)"
           textColor="white"
           alternativeText="Voltar">
            <IoIosArrowBack style={{marginRight: 5, width: 12}}/>
            Voltar</ButtonComponent>
           </div>
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default SearchDomain;
