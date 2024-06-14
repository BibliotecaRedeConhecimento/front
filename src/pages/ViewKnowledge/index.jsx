import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { IoIosArrowBack } from "react-icons/io";
import ButtonComponent from "../../components/ButtonBack";
import { getKnowledgeById } from "../../servicesBack/KnowledgeServices";
import { Image } from "react-bootstrap";

function ViewKnowledge({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { id } = useParams();
  const [knowledge, setKnowledge] = useState(null);

  useEffect(() => {
    const fetchKnowledge = async () => {
      const response = await getKnowledgeById(id);
      setKnowledge(response.data);
    };
    fetchKnowledge();
  }, [id]);

  if (!knowledge) return <div>Loading...</div>;

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer icon={<IoIosArrowBack style={{width: 34, marginRight: 5}} />} title={`Conhecimento`} />
        <PageContentContainer>
          <h2>{knowledge.NameKnowledge}</h2>
          <p><strong>Introdução:</strong> {knowledge.Introduction}</p>
          <p><strong>Categoria:</strong> {knowledge.Category}</p>
          <p><strong>Colaborador:</strong> {knowledge.Contributor}</p>
          <p><strong>{knowledge.TitleMedia}</strong></p>
          <p><strong>{knowledge.Media}</strong></p>
          <p><strong>Descrição:</strong> {knowledge.Description}</p>
          
          <div style={{marginTop: 20}}>
            <ButtonComponent
              size="10rem"
              bgColor="#585859"
              textColor="white"
              alternativeText="Voltar"
            >
              <IoIosArrowBack style={{marginRight: 5, width: 12}}/>
              Voltar
            </ButtonComponent>
          </div>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ViewKnowledge;
