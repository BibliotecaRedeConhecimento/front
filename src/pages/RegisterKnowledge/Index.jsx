import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Form, Row, Col } from "react-bootstrap";
import ButtonModal from "../../components/ButtonModal";

const RegisterKnowledge = () => {
  return (
    <div>
      <PageContainer>
        <PageHeaderContainer title='Cadastrar Conhecimento'/>
        <PageContentContainer>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="NameKnowledge" className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control type="text" placeholder="Como autenticar..." />
                </Form.Group>

                <Form.Group controlId="Introduction" className="mb-3">
                  <Form.Label>Introdução</Form.Label>
                  <Form.Control type="text" placeholder="Introdução do conhecimento..." />
                </Form.Group>

                <Form.Group controlId="Category" className="mb-3">
                  <Form.Label>Seleção de Categoria</Form.Label>
                  <Form.Control as="select">
                    <option>Categoria 1</option>
                    <option>Categoria 2</option>
                    <option>Categoria 3</option>
                    {/* Adicione mais opções conforme necessário */}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="Contributor" className="mb-3">
                  <Form.Label>Colaborador</Form.Label>
                  <Form.Control type="text" placeholder="Nome do colaborador..." />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="TitleMedia" className="mb-3">
                  <Form.Label>Título da Foto/Vídeo</Form.Label>
                  <Form.Control type="text" placeholder="Título da foto ou vídeo..." />
                </Form.Group>

                <Form.Group controlId="Media" className="mb-3">
                  <Form.Label>Foto/Vídeo</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <Form.Group controlId="Description" className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Descrição detalhada..." />
                </Form.Group>
              </Col>
            </Row>

            <ButtonModal buttonText="Confirmar Cadastro"/>
          </Form>
        </PageContentContainer>
      </PageContainer>
    
    </div>
  );
};

export default RegisterKnowledge;
