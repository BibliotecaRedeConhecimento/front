import React, { useEffect, useState } from "react";
import TableKnowledge from "../../components/TableKnowledge";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { getAllKnowledges } from "../../services/KnowledgeServices";
import { IoIosArrowBack } from "react-icons/io";
import ButtonComponent from "../../components/ButtonBack";
import { TfiMenuAlt } from "react-icons/tfi";


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
          <PageHeaderContainer  icon={<TfiMenuAlt style={{width: 34, marginRight: 5}} />} title='Buscar Conhecimento'/>
          <PageContentContainer>

        <TableKnowledge  knowledge={knowledgeData} />
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

export default SearchKnowledge;
