import Table from "react-bootstrap/Table";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./style.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import SearchComponentCategory from "../SearchBar/index.jsx";
import {  Container } from "react-bootstrap";

function TableInativeKnowledge() {


    return (
        <>
           <Container fluid>
            <SearchComponentCategory />
      </Container>
            <TableStyle>
                <div className="table-area">
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th colSpan="1">Título</th>
                                <th colSpan="1">Domínio</th>
                                <th colSpan="1">Categoria</th>
                                <th colSpan="1">Colaborador</th>
                                <th style={{ paddingLeft: 20 }} colSpan="3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>JavaScript e React</td>
                                <td>Des. de Software</td>
                                <td>Front-end</td>
                                <td>Carla</td>
                                <td className="action-column">
                                <MdAddCircleOutline />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </TableStyle>
            <PaginationComponent />
        </>
    );
}

export default TableInativeKnowledge;
