import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";

import { Button, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import ButtonInative from "../ButtonInative/index.jsx";
import { getAllCategories, inactivateCategory } from "../../servicesBack/CategoryServices.js";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import SearchComponentCategory from "../SearchBarCategory/index.jsx";

function TableCategory() {

    const navigate = useNavigate()
    const navigateTo = (path) => {
        navigate(path);
    };
    const [categoryData, setCategoryData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [data, setData] = useState([])
    const [elementsValue, setElementsValue] = useState()
    const [page, setPage] = useState()

    const fetchCategories = async () => {
        const response = await getAllCategories(filterName, elementsValue, page);
        setCategoryData(response.data.content);
        setData(response.data)
        console.log(response.data.content);
    };

    useEffect(() => {
        fetchCategories()
    }, [filterName, elementsValue, page])

    const handleInactivate = async (id) => {
        await inactivateCategory(id);
        fetchCategories();
    };
    const handleElementValue = (elementsNumber) => {
        setElementsValue(elementsNumber)
    }

    const handlePagination = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(() => {
        if (categoryData.length === 0 && page > 0) {
            setPage(page - 1)
        }
    }, [categoryData])

    const { isManager } = useContext(AuthenticationContext)


    return (
        <>
            <Container fluid>
                <SearchComponentCategory onSearch={setFilterName} />
                <div className="d-flex justify-content-end mb-4">
                    <ButtonInative
                        size="10rem"
                        bgColor="var(--verde-primario3)"
                        textColor="white"
                        alternativeText="Categorias Inativas"
                        action={() => navigateTo("/categoriaInativa")}
                    >
                        Inativos
                    </ButtonInative>

                </div>
            </Container>
            <TableStyle>
                <div className="table-area">
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th colSpan="1">Categoria</th>
                                <th colSpan="1">Domínio</th>
                                <th style={{ paddingLeft: 20 }} colSpan="3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(categoryData) && categoryData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{Array.isArray(item.domains) && item.domains.map((domain) => (
                                        <span key={domain.id}>{domain.name}</span>
                                    ))}</td>

                                    <td className="action-column">
                                        {isManager() ?
                                            <>
                                                <Button variant="link"

                                                    onClick={() => navigate(`changeCategory/` + item.id)}>
                                                    <CiEdit className="edit-icon" />
                                                </Button>
                                            </>
                                            : null}
                                    </td>
                                    {isManager() ?
                                        <td className="action-column">
                                            <Button variant="link" onClick={() => handleInactivate(item.id)}>
                                                <RiDeleteBin6Line className="delete-icon" />
                                            </Button>

                                        </td>
                                        : null
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </TableStyle>
            <PaginationComponent changeElementsNumber={handleElementValue} changePage={handlePagination} data={data} />
        </>
    );
}

export default TableCategory;
