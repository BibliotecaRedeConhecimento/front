import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from "react-bootstrap";


function ButtonRoutes({ buttonText, onClick }) {
  return (
   <Container fluid>
   <Row>
      <Button style={{
        backgroundColor: "#013D32",
        color: "white",
        border: "none",
        borderRadius: "8px",
        width: "10rem",
        height: "3rem",
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "20px",
        marginBottom: "20px",
        
      
      }} className="ButtonRoutes" onClick={onClick}>{buttonText}</Button>
    </Row>
  </Container>
  );
}

export default ButtonRoutes;