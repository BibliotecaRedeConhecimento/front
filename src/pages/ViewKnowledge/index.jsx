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

  const fetchKnowledge = async () => {
    const response = await getKnowledgeById(id);
    setKnowledge(response.data);
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  if (!knowledge) return <div>Loading...</div>;

  const getVideoId = (videoUrl) => {
    try {
      const url = new URL(videoUrl);
      if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
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
        <PageHeaderContainer title={`Conhecimento`} />
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
              <div className="button-container">
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
            </div>
          </div>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ViewKnowledge;