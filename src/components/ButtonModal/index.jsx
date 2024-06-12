
import { Col, Container, Row } from "react-bootstrap";
import { ButtonModalStyle } from "./styles";




function ButtonModal({ buttonText, onClick, tabIndex }) {
  return (
    <Container fluid>
      <Row className="justify-content-end">
            <ButtonModalStyle className="ButtonModal" onClick={onClick} tabIndex={tabIndex}>{buttonText}</ButtonModalStyle>
      </Row>
    </Container>
  );
}

export default ButtonModal;