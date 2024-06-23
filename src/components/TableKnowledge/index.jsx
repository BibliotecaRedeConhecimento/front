import Table from "react-bootstrap/Table";
import {RiDeleteBin6Line} from "react-icons/ri";
import {CiEdit} from "react-icons/ci";
import {BsEye} from "react-icons/bs";
import {TableStyle} from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import {Button, Col, Row, Container, Spinner} from "react-bootstrap";
import ButtonInative from "../ButtonInative/index.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {
    getAllKnowledges,
    inactivateKnowledge,
} from "../../servicesBack/KnowledgeServices.js";
import {AuthenticationContext} from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import ToggleSelectDomain from "../SearchBarKnowledgeDomain/index.jsx";
import ToggleSelectCategory from "../SearchBarKnowledgeCategory/index.jsx";
import {toast} from "react-toastify";
import {ReviewContext} from "../../services/context/ReviewContext";
import ModalComponent from "../../components/ModalComponent";

function TableKnowledge() {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    };

    const [showModal, setShowModal] = useState(false);
    const [knowledgeData, setKnowledgeData] = useState([]);
    const [filterTitle, setFilterTitle] = useState("");
    const [elementsValue, setElementsValue] = useState();
    const [page, setPage] = useState();
    const [data, setData] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedKnowledgeId, setSelectedKnowledgeId] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedKnowledgeId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedKnowledgeId(null);
    };

    const fetchKnowledges = async () => {
        setLoading(true);
        try {
            const response = await getAllKnowledges(
                filterTitle,
                elementsValue,
                page,
                selectedDomain,
                selectedCategory
            );
            setKnowledgeData(response.data.content);
            setData(response.data);
            console.log(response.data.content);
            console.log(response.data);
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

    const {toReview} = useContext(ReviewContext);

    useEffect(() => {
        fetchKnowledges();
    }, [filterTitle, page, elementsValue, selectedDomain, selectedCategory]);

    const handleInactivate = async (id) => {
        if (selectedKnowledgeId) {
            const response = await inactivateKnowledge(id);
            if (response && response.status >= 200 && response.status < 300) {
                fetchKnowledges();
                toast.success("Conhecimento inativado com sucesso.");
                handleCloseModal();
            } else {
                toast.error("Erro ao desativar conhecimento.");
            }
        }
    };

    const handleElementValue = (elementsNumber) => {
        setElementsValue(elementsNumber);
    };

    const handlePagination = (pageNumber) => {
        setPage(pageNumber);
    };

    useEffect(() => {
        if (knowledgeData.length === 0 && page > 0) {
            setPage(page - 1);
        }
    }, [knowledgeData]);

    const handleSelectedDomain = (domainId) => {
        setSelectedDomain(domainId);
    };
    const handleSelectedCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const {isManager} = useContext(AuthenticationContext);

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
                <div className="d-flex justify-content-end mb-4">
                    {isManager() ? (
                        <div style={{paddingRight: 20}} className="d-flex gap-3">
                            <ButtonInative
                                size="10rem"
                                bgColor="var(--verde-primario3)"
                                textColor="white"
                                alternativeText="Conhecimentos para revisão"
                                action={() => navigateTo("/revisarConhecimento")}
                            >
                                Revisão ({toReview()})
                            </ButtonInative>
                        </div>
                    ) : null}
                    <div className="d-flex gap-3">
                        <ButtonInative
                            size="10rem"
                            bgColor="var(--verde-primario3)"
                            textColor="white"
                            alternativeText="Categorias Inativas"
                            action={() => navigateTo("/conhecimentoInativo")}
                        >
                            Inativos
                        </ButtonInative>
                    </div>
                </div>
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
                                <th style={{width: '20%'}} colSpan="1">Colaborador</th>
                                <th style={{width: '10%'}} colSpan="3">
                                    Ações
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(knowledgeData) &&
                                knowledgeData.map((knowledge) => {
                                    const uniqueDomains = new Set();
                                    const uniqueCategories = new Set();
                                    knowledge.categories.forEach((category) => {
                                        uniqueCategories.add(category.name);
                                        category.domains.forEach((domain) =>
                                            uniqueDomains.add(domain.name)
                                        );
                                    });

                                    return (
                                        <tr key={knowledge.id}>
                                            <td>{knowledge.title}</td>
                                            <td>{[...uniqueDomains].join(", ")}</td>
                                            <td>{[...uniqueCategories].join(", ")}</td>
                                            <td>{knowledge.collaborator}</td>

                                            <td style={{width: 50}} className="action-column">
                                                <Button
                                                    variant="link"
                                                    onClick={() =>
                                                        navigate(`/viewKnowledge/${knowledge.id}`)
                                                    }
                                                >
                                                    <BsEye className="visualizar-icon"/>
                                                </Button>
                                            </td>
                                            {isManager() && (
                                                <>
                                                    <td style={{paddingRight: 20}} className="action-column">
                                                        <Button
                                                            variant="link"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/buscarConhecimento/changeKnowledge/${knowledge.id}`
                                                                )
                                                            }
                                                        >
                                                            <CiEdit className="edit-icon"/>
                                                        </Button>
                                                    </td>
                                                    <td style={{paddingRight: 40}}
                                                        className="action-column"
                                                        onClick={() => handleOpenModal(knowledge.id)}
                                                    >
                                                        <RiDeleteBin6Line className="delete-icon"/>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </div>
            </TableStyle>
            <PaginationComponent
                changeElementsNumber={handleElementValue}
                changePage={handlePagination}
                data={data}
            />
            <ModalComponent
                confirmButton="Inativar"
                tabIndex="-1"
                bodyContent={"Deseja inativar esse conhecimento?"}
                show={showModal}
                handleClose={() => {
                    handleCloseModal();
                    toast.error("Operação cancelada pelo usuário.");
                }}
                confirm={() => handleInactivate(selectedKnowledgeId)}
                cancel={() => {
                    handleCloseModal();
                    toast.error("Operação cancelada pelo usuário.");
                }}
            />
        </>
    );
}

export default TableKnowledge;
