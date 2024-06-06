import React from "react";
import TableKnowledge from "../../components/TableKnowledge";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";


const SearchKnowledge = () => {
  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Conhecimento'/>
          <PageContentContainer>

        <TableKnowledge />
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default SearchKnowledge;
