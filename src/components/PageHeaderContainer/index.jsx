

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PageHeaderContainerStyle } from "./style";
import ButtonComponent from "../ButtonBack";

function PageHeaderContainer({ title, icon, buttonback }) {
  return (
    <Row>
      <Col>
        <PageHeaderContainerStyle className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            {buttonback}
          </div>
          <div className="d-flex justify-content-center align-items-center mx-auto">
            {icon}
            <span className="ml-2">{title}</span>
          </div>
          <div className="d-flex" style={{ visibility: 'hidden' }}>
            {buttonback}
          </div>
        </PageHeaderContainerStyle>
      </Col>
    </Row>
  );
}

export default PageHeaderContainer;


