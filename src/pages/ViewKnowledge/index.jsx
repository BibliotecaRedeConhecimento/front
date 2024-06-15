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

  const fetchKnowledge = async () => {
    const response = await getKnowledgeById(id);
    setKnowledge(response.data);
    console.log(response.data.title)
    console.log(knowledge)
  };
  useEffect(() => {
    fetchKnowledge();
  }, []);

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
        <PageHeaderContainer icon={<IoIosArrowBack style={{ width: 34, marginRight: 5 }} />} title={`Conhecimento`} />
        <PageContentContainer>
          <h1>{knowledge.title}</h1>
          <p><strong>Introdução</strong></p>
          <p>{knowledge.introduction}</p>
          <p><strong>{knowledge.titleMedia}</strong></p>
          <p>{knowledge.description}</p>
          <div style={{ marginTop: 20 }}>
            <ButtonComponent
              size="10rem"
              bgColor="var(--cinza-primario)"
              textColor="white"
              alternativeText="Voltar"
            >
              <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
              Voltar
            </ButtonComponent>
          </div>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ViewKnowledge;
