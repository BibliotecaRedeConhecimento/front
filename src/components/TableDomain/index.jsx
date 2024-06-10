import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import SearchComponentCategory from "../SearchCategory/index.jsx";
import SearchComponentDomain from "../SelectDomain/index.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { FontSizeContext } from "../../Context/FontSizeProvider.jsx";

function TableDomain({domain}) {
  const { fontSize } = useContext(FontSizeContext);

  return (
    <>
     <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <SearchComponentCategory />
        </Col>
        <Col xs={12} md={6}>
          <SearchComponentDomain />
        </Col>
      </Row>
    </Container>
    <TableStyle>
      <div style={{ fontSize: `${fontSize}px`}} className="table-area">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th colSpan="1">Domínio</th>
              <th style={{paddingLeft:20}} colSpan="3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(domain) && domain.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="action-column">
                <BsEye />
              </td>
              <td className="action-column">
                <CiEdit />
              </td>
              <td className="action-column">
                <RiDeleteBin6Line id="delete-icon" />
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </TableStyle>
    <PaginationComponent/>
    </>
  );
}

export default TableDomain;
