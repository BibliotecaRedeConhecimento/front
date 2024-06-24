
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from "react-bootstrap";
import { ButtonRoutesStyle } from './styles';



function ButtonRoutes({ buttonText, onClick, alternativeText }) {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <ButtonRoutesStyle aria-label={alternativeText} size="lg"  className="ButtonRoutes" onClick={onClick}>{buttonText}</ButtonRoutesStyle>
      </Row>
    </Container>
  );
}

export default ButtonRoutes;