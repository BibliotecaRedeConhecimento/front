
import { Col, Container, Row } from "react-bootstrap";
import { ButtonModalStyle } from "./styles";




function ButtonModal({ buttonText, onClick }) {
  return (
    <Container fluid>
      <Row className="justify-content-end">
        <ButtonModalStyle  size="lg"  className="ButtonModal" onClick={onClick}>{buttonText}</ButtonModalStyle>
      </Row>
    </Container>
  );
}

export default ButtonModal;