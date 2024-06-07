import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import TableCategory from "../../components/TableCategory";
import { getAllCategories } from "../../services/CategoryServices";

const SearchCategory = () => {
  const [category, setCategory] = useState([]);

  const searchCategory = async () => {
    try {
      const resp = await getAllCategories();
      console.log(resp.data.content);
      setCategory(resp.data.content);
    } catch (err) {
      console.log("ERRO: ", err);
    }
  };

  useEffect(() => {
    searchCategory();
  }, []);


  console.log(category)
  return (
    <div>
      <PageContainer>
        <PageHeaderContainer title="Categorias" />
        <PageContentContainer>
          <TableCategory category={category} />
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default SearchCategory;
