import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PageHeaderContainerStyle } from "./styles.jsx";

function PageHeaderContainer({ title, icon }) {
  return (
    <Row>
      <Col>
        <PageHeaderContainerStyle>
          {icon}
          <span>{title}</span>
        </PageHeaderContainerStyle>
      </Col>
    </Row>
  );
}

export default PageHeaderContainer;
