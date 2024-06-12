import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import SearchComponentCategory from "../SearchBar/index.jsx";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { FontSizeContext } from "../../Context/FontSizeProvider.jsx";
import { useNavigate } from "react-router-dom";

function TableCategory({category}) {
  const { fontSize } = useContext(FontSizeContext);
const navigate = useNavigate()

  return (
    <>
     <Container fluid>
            <SearchComponentCategory />
      </Container>
    <TableStyle>
      <div style={{ fontSize: `${fontSize}px`}} className="table-area">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th colSpan="1">Categoria</th>
              <th colSpan="1">Domínio</th>
              <th style={{paddingLeft:20}} colSpan="3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(category) && category.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.domain}</td>
              <td className="action-column">
                <button onClick={() => navigate(`changeCategory/` + item.id)}>
                <CiEdit />
                </button>
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

export default TableCategory;
