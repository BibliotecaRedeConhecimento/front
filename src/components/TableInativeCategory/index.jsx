import Table from "react-bootstrap/Table";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";


import { Container } from "react-bootstrap";
import {useContext} from "react";
import {AuthenticationContext} from "../../services/context/AuthContext";


function TableInativeCategory() {
  const {isManager} = useContext(AuthenticationContext)

  return (
    <>
     <Container fluid>
           
      </Container>
    <TableStyle>
      <div className="table-area">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th colSpan="1">Categoria Inativa</th>
              <th colSpan="1">Domínio</th>
              <th colSpan="3">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Testes de Unidade</td>
              <td>Testes de Software</td>
              <td className="action-column">
              <MdAddCircleOutline />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </TableStyle>
    <PaginationComponent/>
    </>
  );
}

export default TableInativeCategory;
