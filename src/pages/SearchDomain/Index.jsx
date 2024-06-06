import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form } from "react-bootstrap"
import TableDomain from "../../components/TableDomain";

const SearchDomain = () => {
  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Domínios'/>
          <PageContentContainer>

        <TableDomain />
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default SearchDomain;
