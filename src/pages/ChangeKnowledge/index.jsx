import React, { useState } from 'react';
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonConfirmRegistration from '../../components/ButtonConfirmRegistration';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ButtonComponent from '../../components/ButtonBack';
import { MdOutlineAddCircle } from "react-icons/md";


const ChangeKnowledge = () => {
  const [formData, setFormData] = useState({
    NameKnowledge: '',
    Introduction: '',
    Category: '',
    Contributor: '',
    TitleMedia: '',
    Media: '',
    Description: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { NameKnowledge, Introduction, Category, Contributor, TitleMedia, Media, Description } = formData;

    if (!NameKnowledge || !Introduction || !Category || !Contributor || !TitleMedia || !Media || !Description) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    // Lógica para enviar os dados do formulário para o servidor

    toast.success("Cadastro realizado com sucesso!");
  };

  return (
    <div>
      <PageContainer>
        <PageHeaderContainer icon={<MdOutlineAddCircle style={{width: 34, marginRight: 5}} />} title='Alterar Conhecimento' />
        <PageContentContainer>
          <Form onSubmit={handleSubmit}>
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
                  />
                </Form.Group>

                <Form.Group controlId="Introduction" className="mb-3">
                  <Form.Label>Introdução</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introdução do conhecimento..."
                    value={formData.Introduction}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="Category" className="mb-3">
                  <Form.Label>Seleção de Categoria</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.Category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option>Categoria 1</option>
                    <option>Categoria 2</option>
                    <option>Categoria 3</option>
                    {/* Adicione mais opções conforme necessário */}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="Contributor" className="mb-3">
                  <Form.Label>Colaborador</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do colaborador..."
                    value={formData.Contributor}
                    onChange={handleChange}
                    required
                  />
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
                  />
                </Form.Group>

                <Form.Group controlId="Media" className="mb-3">
                  <Form.Label>URL da Foto/Vídeo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cole a URL da foto ou vídeo aqui..."
                    value={formData.Media}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="Description" className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descrição detalhada..."
                    value={formData.Description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-3">
              <ButtonComponent
                size="10rem"
                bgColor="#585859"
                textColor="white"
                alternativeText="Voltar">
                <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
                Voltar
              </ButtonComponent>
              <ButtonConfirmRegistration
                size="10rem"
                bgColor="#013d32"
                textColor="white"
                alternativeText="Cadastrar">
                Cadastrar
                <IoIosArrowForward style={{ marginLeft: 5, width: 12 }} />
              </ButtonConfirmRegistration>
            </div> 

          </Form>
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </div>
  );
};

export default ChangeKnowledge;
