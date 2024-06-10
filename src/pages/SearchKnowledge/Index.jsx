import React, { useEffect, useState } from "react";
import TableKnowledge from "../../components/TableKnowledge";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { getAllKnowledges } from "../../services/KnowledgeServices";


const SearchKnowledge = () => {

 const [knowledgeData, setKnowledgeData] = useState([])

const fetchKnowledges = async() => {
const response = await getAllKnowledges()
setKnowledgeData(response.data.content)
console.log(response.data.content)
}

useEffect(() => {
  fetchKnowledges()
}, [])

  return (
    <div>
      <PageContainer>
          <PageHeaderContainer title='Conhecimento'/>
          <PageContentContainer>

        <TableKnowledge  knowledge={knowledgeData} />
         
          
          
           
           
           
         </PageContentContainer>
        </PageContainer>
    </div>
  );
};

export default SearchKnowledge;
