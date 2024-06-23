import Table from "react-bootstrap/Table";
import {MdAddCircleOutline} from "react-icons/md";
import {TableStyle} from "./style.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import {Container, Button, Row, Col, Spinner} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {
    getAllInactiveKnowledges,
    inactivateKnowledge,
} from "../../servicesBack/KnowledgeServices.js";
import {AuthenticationContext} from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import ToggleSelectDomain from "../SearchBarKnowledgeDomain/index.jsx";
import ToggleSelectCategory from "../SearchBarKnowledgeCategory/index.jsx";
import ModalComponent from "../../components/ModalComponent";
import {toast} from "react-toastify";

function TableInativeKnowledge() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const {isManager} = useContext(AuthenticationContext);
    const [inactiveKnowledgeData, setInactiveKnowledgeData] = useState([]);
    const [data, setData] = useState([]);
    const [elementsValue, setElementsValue] = useState();
    const [page, setPage] = useState();
    const [filterTitle, setFilterTitle] = useState("");
    const [selectedDomain, setSelectedDomain] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const {user} = useContext(AuthenticationContext);
    const [selectedInativeKnowledgeId, setSelectedInativeKnowledgeId] =
        useState(null);
    const [noResults, setNoResults] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedInativeKnowledgeId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInativeKnowledgeId(null);
    };

    const fetchInactiveKnowledges = async () => {
        setLoading(true);
        try {
            const response = await getAllInactiveKnowledges(
                filterTitle,
                elementsValue,
                page,
                selectedDomain,
                selectedCategory
            );
            setInactiveKnowledgeData(response.data.content);
            setData(response.data);
            if (response.data.content.length === 0 && filterTitle.trim() !== "") {
                setNoResults(true); // Define true se a busca não retornar resultados
                toast.error("Nenhum conhecimento encontrado.");
            } else {
                setNoResults(false);
            }
        } catch (error) {
            console.error("Erro ao buscar conhecimentos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInactiveKnowledges();
    }, [filterTitle, elementsValue, page, selectedCategory, selectedDomain]);

    const handleActivate = async (id) => {
        try {
            const response = await inactivateKnowledge(id);
            if (response && response.status >= 200 && response.status < 300) {
                fetchInactiveKnowledges();
                toast.success("Conhecimento ativado com sucesso.");
                handleCloseModal();
            } else {
                toast.error("Erro ao ativar conhecimento. Verifique se há categorias relacionadas inativas.");
            }
        } catch (error) {
            toast.error("Erro ao ativar conhecimento.");
        }
    };

    useEffect(() => {
        if (inactiveKnowledgeData.length === 0 && page > 0) {
            setPage(page - 1);
        }
    }, [inactiveKnowledgeData]);

    const handleElementValue = (elementsNumber) => {
        setElementsValue(elementsNumber);
    };

    const handlePagination = (pageNumber) => {
        setPage(pageNumber);
    };
    const handleSelectedDomain = (domainId) => {
        setSelectedDomain(domainId);
    };
    const handleSelectedCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <>
            <Container fluid>
                <SearchComponentKnowledge onSearch={setFilterTitle}/>
                <Row style={{marginBottom: 40}}>
                    <Col md={6}>
                        <ToggleSelectDomain
                            domainSelected={selectedDomain}
                            selectDomain={handleSelectedDomain}
                        />
                    </Col>
                    <Col md={6}>
                        <ToggleSelectCategory
                            categorySelected={selectedCategory}
                            domainSelected={selectedDomain}
                            selectCategory={handleSelectedCategory}
                        />
                    </Col>
                </Row>
            </Container>
            <TableStyle>
                <div className="table-area">
                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Table striped hover responsive>
                            <thead>
                            <tr>
                                <th style={{width: '30%'}} colSpan="1">Título</th>
                                <th style={{width: '20%'}} colSpan="1">Domínio</th>
                                <th style={{width: '20%'}} colSpan="1">Categoria</th>
                                <th style={{width: '25%'}} colSpan="1">Colaborador</th>
                                {isManager() ? (
                                    <th style={{width: '5%'}} colSpan="1">
                                        Ações
                                    </th>
                                ) : null}
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(inactiveKnowledgeData) &&
                                inactiveKnowledgeData.map((knowledge) => (
                                    <tr key={knowledge.id}>
                                        <td>{knowledge.title}</td>
                                        <td>
                                            {Array.isArray(knowledge.categories) &&
                                                knowledge.categories.map(
                                                    (category) =>
                                                        Array.isArray(category.domains) &&
                                                        category.domains.map((domain) => (
                                                            <span key={domain.id}>{domain.name}</span>
                                                        ))
                                                )}
                                        </td>
                                        <td>
                                            {Array.isArray(knowledge.categories) &&
                                                knowledge.categories.map((category) => (
                                                    <span key={category.id}>{category.name}</span>
                                                ))}
                                        </td>
                                        {/*<td>{knowledge.text}</td>*/}
                                        <td>{knowledge.collaborator}</td>
                                        {isManager() ? (
                                            <td className="action-column">
                                                <Button
                                                    variant="link"
                                                    onClick={() => handleOpenModal(knowledge.id)}
                                                >
                                                    <MdAddCircleOutline/>
                                                </Button>
                                            </td>
                                        ) : null}
                                    </tr>
                                ))}
                            </tbody>
                            <ModalComponent
                                confirmButton="Reativar"
                                tabIndex="-1"
                                bodyContent={"Deseja reativar esse conhecimento?"}
                                show={showModal}
                                handleClose={() => {
                                    handleCloseModal();
                                    toast.error("Operação cancelada pelo usuário.");
                                }}
                                confirm={() => handleActivate(selectedInativeKnowledgeId)}
                                cancel={() => {
                                    handleCloseModal();
                                    toast.error("Operação cancelada pelo usuário.");
                                }}
                            />
                        </Table>
                    )}
                </div>


            </TableStyle>
            <PaginationComponent
                changeElementsNumber={handleElementValue}
                changePage={handlePagination}
                data={data}
            />
        </>
    );
}

export default TableInativeKnowledge;
