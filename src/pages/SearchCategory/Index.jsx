import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import TableCategory from "../../components/TableCategory";
import { getAllCategories } from "../../services/CategoryServices";

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
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default SearchCategory;
