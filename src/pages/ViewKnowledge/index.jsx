import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import ButtonComponent from "../../components/ButtonBack";
import { getKnowledgeById } from "../../servicesBack/KnowledgeServices";
import { Image, Spinner } from "react-bootstrap"; 
import { SlBookOpen } from "react-icons/sl";
import "./style.css";

function ViewKnowledge({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { id } = useParams();
  const [knowledge, setKnowledge] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchKnowledge = async () => {
    try {
      const response = await getKnowledgeById(id);
      setKnowledge(response.data);
    } catch (error) {
      console.error("Erro ao buscar conhecimento:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  if (loading) {
    return (
      <ContainerWithSidebar
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        HandledarkMode={HandledarkMode}
        isDarkMode={isDarkMode}
        logOut={logOut}
      >
        <PageContainer>
          <PageHeaderContainer
          title={`Conhecimento`}
          icon={<SlBookOpen style={{width: 34, marginRight: 15}} />} 
            buttonback={
              <ButtonComponent
                size="8rem"
                //bgColor="var(--cinza-primario)"
                textColor="white"
                alternativeText="Voltar"
              ></ButtonComponent>
            }
          />
          <PageContentContainer>
            <div className="text-center mt-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </div>
          </PageContentContainer>
        </PageContainer>
      </ContainerWithSidebar>
    );
  }

  if (!knowledge) {
    return (
      <ContainerWithSidebar
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        HandledarkMode={HandledarkMode}
        isDarkMode={isDarkMode}
        logOut={logOut}
      >
        <PageContainer>
          <PageHeaderContainer
          title={`Conhecimento`}
          icon={<SlBookOpen style={{width: 34, marginRight: 15}} />} 
            buttonback={
              <ButtonComponent
                size="8rem"
                //bgColor="var(--cinza-primario)"
                textColor="white"
                alternativeText="Voltar"
              ></ButtonComponent>
            }
          />
          <PageContentContainer>
            <div className="text-center mt-5">
              <div>Não foi possível carregar o conhecimento.</div>
            </div>
          </PageContentContainer>
        </PageContainer>
      </ContainerWithSidebar>
    );
  }

  const getVideoId = (videoUrl) => {
    try {
      const url = new URL(videoUrl);
      if (
        url.hostname === "www.youtube.com" ||
        url.hostname === "youtube.com"
      ) {
        return url.searchParams.get("v");
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const renderMediaThumbnail = () => {
    if (!knowledge.archive) return null;

    const videoId = getVideoId(knowledge.archive);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <div className="thumbnail">
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "500px", height: "315px", borderRadius: 10 }}
          ></iframe>
        </div>
      );
    } else {
      return (
        <div className="thumbnail">
          <Image
            src={knowledge.archive}
            alt="Imagem"
            fluid
            style={{ width: "auto", height: "300px", borderRadius: 10 }}
          />
        </div>
      );
    }
  };

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer
        title={`Conhecimento`}
        icon={<SlBookOpen style={{width: 34, marginRight: 15}} />} 
          buttonback={
            <ButtonComponent
              size="8rem"
              //bgColor="var(--cinza-primario)"
              textColor="white"
              alternativeText="Voltar"
            ></ButtonComponent>
          }
        />
        <PageContentContainer>
          <div className="container">
            <div className="content">
              <p>
                <strong>{knowledge.title}</strong>
              </p>
              <strong>Introdução:</strong>
              <p>{knowledge.introduction}</p>
              <p>
                <strong>{knowledge.titleMedia}</strong>
              </p>
              {renderMediaThumbnail()}
              <p className="description">{knowledge.description}</p>
            </div>
          </div>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ViewKnowledge;
