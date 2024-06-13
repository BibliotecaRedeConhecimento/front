import { React, useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import { IoIosArrowBack } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import TableCategory from "../../components/TableCategory";
import { getAllCategories } from "../../servicesBack/CategoryServices";
import ButtonComponent from "../../components/ButtonBack";
import ButtonInative from "../../components/ButtonInative";

function SearchCategory({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {

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
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer icon={<TfiMenuAlt style={{width: 34, marginRight: 5}} />} title={`Buscar Categoria`} />
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
    </ContainerWithSidebar>
  );
}

export default SearchCategory;