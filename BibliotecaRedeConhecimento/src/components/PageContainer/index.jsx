
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PageContainerStyle } from "./styles.jsx";

function PageContainer(props) {
  return (
    <PageContainerStyle>
      <Row>
        <Col className="col-12">{props.children}</Col>
      </Row>
    </PageContainerStyle>
  );
}

export default PageContainer;
