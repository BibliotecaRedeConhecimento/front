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
import { getKnowledgeById, updateKnowledge } from "../../servicesBack/KnowledgeServices";
import { useParams } from "react-router-dom";
import ModalComponent from "../../components/ModalComponent";

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
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const response = await getKnowledgeById(id);
        const knowledgeData = response.data;
        setFormData({
          NameKnowledge: knowledgeData.title,
          Introduction: knowledgeData.introduction,
          categoryId: knowledgeData.categories[0]?.id || "",
          Contributor: knowledgeData.collaborator,
          TitleMedia: knowledgeData.titleMedia,
          Media: knowledgeData.archive,
          Description: knowledgeData.description,
        });
        setThumbnail(getYouTubeThumbnail(knowledgeData.archive));
      } catch (error) {
        (err)
      }
    };

    fetchKnowledge();

    const fetchCategories = async () => {
      try {
        const resp = await getAllCategories();
        setCategories(resp.data.content);
      } catch (error) {
        toast.error("Erro ao carregar as categorias.");
      }
    };

    fetchCategories();
  }, [id]);

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

  const handleOpenModal = (event) => {
    event.preventDefault();
    const form = document.getElementById("knowledgeForm");
    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error("O campo é obrigatório!");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      toast.error("Todos os campos são obrigatórios!");
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
    });
    handleCloseModal();
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
          <Form id="knowledgeForm" noValidate validated={validated} onSubmit={handleOpenModal}>
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
                    as="textarea"
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
                  bgColor="var(--verde-primario)"
                  textColor="white"
                  alternativeText="Cadastrar"
                  onClick={handleOpenModal}
              >
                Alterar
                <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
              </ButtonConfirmRegistration>
            </div>
          </Form>
          <ModalComponent
              tabIndex="-1"
              bodyContent={"Deseja cadastrar o Domínio?"}
              show={showModal}
              handleClose={() => {
                handleCloseModal();
                toast.error("Edição de domínio cancelada.");  
              }}
              confirm={handleSubmit}
              cancel={() => {
                handleCloseModal();
                toast.error("Edição de domínio cancelada.");  
              }}
            />
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
}

export default ChangeKnowledge;
