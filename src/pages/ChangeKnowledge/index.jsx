import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import { Form, Row, Col, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/ButtonBack";
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";
import { getAllCategories } from "../../servicesBack/CategoryServices";
import { updateKnowledge } from "../../servicesBack/KnowledgeServices";
import { useParams } from "react-router-dom";

function ChangeKnowledge({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [formData, setFormData] = useState({
    NameKnowledge: "",
    Introduction: "",
    categoryId: "",
    Contributor: "",
    TitleMedia: "",
    Media: "",
    Description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "categoryId") {
      setFormData({
        ...formData,
        [id]: Number(value),
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    if (id === "Media") {
      setThumbnail(getYouTubeThumbnail(value));
    }
  };

  const handleSubmit = async(e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    const {
      NameKnowledge,
      Introduction,
      categoryId,
      Contributor,
      TitleMedia,
      Media,
      Description,
    } = formData;

    if (
      !NameKnowledge ||
      !Introduction ||
      !categoryId ||
      !Contributor ||
      !TitleMedia ||
      !Media ||
      !Description
    ) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }
    const resp = await updateKnowledge(id, {
      title: formData.NameKnowledge,
        archive: formData.Media,
        collaborator: formData.Contributor,
        description: formData.Description,
        introduction: formData.Introduction,
        titleMedia: formData.TitleMedia,
        categories: [
          {
            id: formData.categoryId,
          },
        ],
    })
    toast.success("Cadastro realizado com sucesso!");
  };

  const getYouTubeThumbnail = (url) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://img.youtube.com/vi/${videoIdMatch[1]}/0.jpg`
      : null;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await getAllCategories();
      console.log(resp.data.content);
      setCategories(resp.data.content);
    };
    fetchCategories();
  }, []);

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
          icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />}
          title={`Editar Conhecimento`}
        />
        <PageContentContainer>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="NameKnowledge" className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Como autenticar..."
                    value={formData.NameKnowledge}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}

                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Introduction" className="mb-3">
                  <Form.Label>Introdução</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introdução do conhecimento..."
                    value={formData.Introduction}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="categoryId" className="mb-3">
                  <Form.Label>Seleção de Categoria</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}
                  >
                    <option value="">Selecione uma categoria</option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (

                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                    )
                      )}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Contributor" className="mb-3">
                  <Form.Label>Colaborador</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do colaborador..."
                    value={formData.Contributor}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="TitleMedia" className="mb-3">
                  <Form.Label>Título da Foto/Vídeo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título da foto ou vídeo..."
                    value={formData.TitleMedia}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="Media" className="mb-3">
                  <Form.Label>URL do vídeo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cole a URL do vídeo aqui..."
                    value={formData.Media}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>

                {thumbnail && (
                  <div className="mb-3">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail"
                      fluid
                      style={{ maxWidth: "170px", maxHeight: "170px" }}
                    />
                  </div>
                )}

                <Form.Group controlId="Description" className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descrição detalhada..."
                    value={formData.Description}
                    onChange={handleChange}
                    required
                    style={{ width: "80%" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campo obrigatório.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-3">
              <ButtonComponent
                size="10rem"
                bgColor="var(--cinza-primario)"
                textColor="white"
                alternativeText="Voltar"
              >
                <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
                Voltar
              </ButtonComponent>
              <ButtonConfirmRegistration
                size="10rem"
                bgColor="#013d32"
                textColor="white"
                alternativeText="Cadastrar"
              >
                Cadastrar
                <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
              </ButtonConfirmRegistration>
            </div>
          </Form>
          <ToastContainer />
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ChangeKnowledge;
