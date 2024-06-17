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
    const url = new URL(videoUrl);
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      return url.searchParams.get("v");
    } else {
      throw new Error("URL do vídeo inválida");
    }
  };

  const renderVideoThumbnail = () => {
    if (!knowledge.archive) return null;

    try {
      const videoId = getVideoId(knowledge.archive);
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      return (
        <div className="thumbnail">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Image
              src={thumbnailUrl}
              alt="Thumbnail do vídeo"
              fluid
              style={{ width: "auto", height: "200px", borderRadius: 10 }}
            />
          </a>
        </div>
      );
    } catch (error) {
      console.error("Erro ao obter a thumbnail do vídeo", error);
      return null;
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
                <p>{knowledge.titleMedia}</p>
              </p>
              {renderVideoThumbnail()}
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

