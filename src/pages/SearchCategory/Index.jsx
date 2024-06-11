import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import TableCategory from "../../components/TableCategory";
import { getAllCategories } from "../../services/CategoryServices";
import { IoIosArrowBack } from "react-icons/io";

import ButtonComponent from "../../components/ButtonBack";

const SearchCategory = () => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategories = async () => {
    const response = await getAllCategories();
    setCategoryData(response.data.content)
    console.log(response.data.content)
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <PageContainer>
        <PageHeaderContainer title="Categorias" />
        <PageContentContainer>
          <TableCategory category={categoryData}/>
          <div style={{marginTop: 20}}>
          <ButtonComponent
           size="10rem"
           bgColor="#585859"
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

export default SearchCategory;
