import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import SearchComponentCategory from "../SearchBar/index.jsx";
import {  Container } from "react-bootstrap";
import { useContext } from "react";
import { FontSizeContext } from "../../Context/FontSizeProvider.jsx";

function TableComponent() {
    const { fontSize } = useContext(FontSizeContext);

    return (
        <>
           <Container fluid>
            <SearchComponentCategory />
      </Container>
            <TableStyle>
                <div style={{ fontSize: `${fontSize}px` }} className="table-area">
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
            <PaginationComponent />
        </>
    );
}

export default TableComponent;
