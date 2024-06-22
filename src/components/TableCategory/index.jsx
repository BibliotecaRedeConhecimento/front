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
import { toast } from 'react-toastify';
import ModalComponent from "../../components/ModalComponent";

function TableCategory() {

    const navigate = useNavigate()
    const navigateTo = (path) => {
        navigate(path);
    };

    const [showModal, setShowModal] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [data, setData] = useState([])
    const [elementsValue, setElementsValue] = useState()
    const [page, setPage] = useState()
    const [noResults, setNoResults] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleOpenModal = (id) => {
        setSelectedCategoryId(id);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCategoryId(null);
      };

    const fetchCategories = async () => {
        const response = await getAllCategories(filterName, elementsValue, page);
        setCategoryData(response.data.content);
        setData(response.data)
        console.log(response.data.content);
        if (response.data.content.length === 0 && filterName.trim() !== '') {
            setNoResults(true); // Define true se a busca não retornar resultados
            toast.error('Nenhuma categoria encontrada.');
        } else {
            setNoResults(false);
        }
    };

    useEffect(() => {
        fetchCategories()
    }, [filterName, elementsValue, page])

    const handleInactivate = async (id) => {
        if (selectedCategoryId) {
        await inactivateCategory(selectedCategoryId);
        fetchCategories();
        toast.success("Categoria inativado com sucesso!");
        handleCloseModal();
    }
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
    }, [categoryData, page])

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
                                            <Button variant="link" onClick={() => handleOpenModal(item.id)}>
                                                <RiDeleteBin6Line className="delete-icon" />
                                            </Button>

                                        </td>
                                        : null
                                    }
                                </tr>
                            ))}
                        </tbody>
                        <ModalComponent
              confirmButton="Inativar"
              tabIndex="-1"
              bodyContent={"Deseja inativar a categoria?"}
              show={showModal}
              handleClose={() => {
                handleCloseModal();
                toast.error("Operação cancelada pelo usuário.");
              }}
              confirm={handleInactivate}
              cancel={() => {
                handleCloseModal();
                toast.error("Operação cancelada pelo usuário.");
              }}
            />
                    </Table>
                </div>
            </TableStyle>
            <PaginationComponent changeElementsNumber={handleElementValue} changePage={handlePagination} data={data} />
        </>
    );
}

export default TableCategory;
