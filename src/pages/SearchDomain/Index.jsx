import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap";
import TableDomain from "../../components/TableDomain";
import { getAllDomains } from "../../services/DomainServices";

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
        <PageHeaderContainer title="Domínios" />
        <PageContentContainer>
          <TableDomain domain={domainData}/>
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default SearchDomain;
