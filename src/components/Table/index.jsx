import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";

import { TableStyle } from "./styles.jsx";
import SearchComponent from "../TableSearch/index.jsx";
import PaginationComponent from "../TablePagination/index.jsx";

function TableComponent() {
  return (
    <>
    <SearchComponent/>
    <TableStyle>
      <div className="table-area">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th colSpan="1">Registro</th>
              <th colSpan="1">Nome</th>
              <th colSpan="1">Sobrenome</th>
              <th colSpan="1">Email</th>
              <th style={{paddingLeft:12}} colSpan="3">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#334</td>
              <td>João</td>
              <td>Silva</td>
              <td>joao@gmail.com</td>
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
            <tr>
              <td>#335</td>
              <td>Maria</td>
              <td>Santos</td>
              <td>maria@gmail.com</td>
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
          </tbody>
        </Table>
      </div>
    </TableStyle>
    <PaginationComponent/>
    </>
  );
}

export default TableComponent;
