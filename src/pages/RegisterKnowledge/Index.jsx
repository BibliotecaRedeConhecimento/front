import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonModal from "../../components/ButtonModal";
import ButtonComponent from "../../components/ButtonBack";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ButtonConfirmRegistration from "../../components/ButtonConfirmRegistration";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { addKnowledge } from "../../servicesBack/KnowledgeServices";
import { getAllCategories } from "../../servicesBack/CategoryServices";

const RegisterKnowledge = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,}) => {
  const [formData, setFormData] = useState({
    NameKnowledge: "",
    Introduction: "",
    categoryId: "",
    Contributor: "",
    TitleMedia: "",
    Media: "",
    Description: "",
  });

  const [validated, setValidated] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState([]);

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
  };

  const handleMediaChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, Media: value });
    const videoId = getVideoId(value);
    if (videoId) {
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    } else {
      setThumbnailUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      toast.error("Todos os campos são obrigatórios!");
    } else {
      toast.success("Cadastro realizado com sucesso!");
      const resp = await addKnowledge({
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
      });
    }
    setValidated(true);
  };

  const getVideoId = (videoUrl) => {
    try {
      const url = new URL(videoUrl);
      if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
        return url.searchParams.get("v");
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await getAllCategories();
      console.log(resp);
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
    logOut={logOut}>
      <div>
        <PageContainer>
          <PageHeaderContainer
            icon={<MdOutlineAddCircle style={{ width: 34, marginRight: 5 }} />}
            title="Cadastrar Conhecimento"
          />
          <PageContentContainer>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row >
                <Col md={6} >
                  <Form.Group controlId="NameKnowledge" className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Como autenticar..."
                      value={formData.NameKnowledge}
                      onChange={handleChange}
                      required
                      
                      style={{ width: "80%" ,backgroundColor: "var(--branco-primario2)"}}
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
                      style={{ width: "80%" ,backgroundColor: "var(--branco-primario2)" }}
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
                      style={{ width: "80%" ,backgroundColor: "var(--branco-primario2)"}}
                    >
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
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
                      style={{ width: "80%" ,backgroundColor: "var(--branco-primario2)"}}
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
                      style={{ width: "80%",backgroundColor: "var(--branco-primario2)" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Campo obrigatório.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="Media" className="mb-3">
                    <Form.Label>URL do vídeo</Form.Label>
                    <Form.Control
                      placeholder="Cole a URL do vídeo aqui..."
                      type="text"
                      value={formData.Media}
                      onChange={handleMediaChange}
                      required
                      style={{ width: "80%",backgroundColor: "var(--branco-primario2)" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Campo obrigatório.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {thumbnailUrl && (
                    <div className="mb-3">
                      <img
                        src={thumbnailUrl}
                        alt="Thumbnail do vídeo"
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
                      style={{ width: "80%",backgroundColor: "var(--branco-primario2)" }}
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
                  bgColor="var(--verde-primario)"
                  textColor="white"
                  alternativeText="Cadastrar"
                  onClick={handleSubmit}
                >
                  Cadastrar
                  <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
                </ButtonConfirmRegistration>
              </div>
            </Form>
          </PageContentContainer>
        </PageContainer>
        <ToastContainer />
      </div>
    </ContainerWithSidebar>
  );
};

export default RegisterKnowledge;
