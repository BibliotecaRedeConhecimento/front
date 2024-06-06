import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import TableCategory from "../../components/TableCategory";


const SearchCategory = () => {
  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Categorias'/>
          <PageContentContainer>

        <TableCategory />
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default SearchCategory;
