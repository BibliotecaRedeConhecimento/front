import Table from "react-bootstrap/Table";
import {MdAddCircleOutline} from "react-icons/md";
import {TableStyle} from "./style.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import {Container, Button, Row, Col} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {getAllInactiveKnowledges, inactivateKnowledge} from "../../servicesBack/KnowledgeServices.js";
import {AuthenticationContext} from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import ToggleSelectDomain from "../SearchBarKnowledgeDomain/index.jsx";
import ToggleSelectCategory from "../SearchBarKnowledgeCategory/index.jsx";
import ModalComponent from "../../components/ModalComponent";
import {toast} from 'react-toastify';

function TableInativeKnowledge() {
    const [showModal, setShowModal] = useState(false);
    const {isManager} = useContext(AuthenticationContext);
    const [inactiveKnowledgeData, setInactiveKnowledgeData] = useState([]);
    const [data, setData] = useState([])
    const [elementsValue, setElementsValue] = useState()
    const [page, setPage] = useState()
    const [filterTitle, setFilterTitle] = useState('');
    const [selectedDomain, setSelectedDomain] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const {user} = useContext(AuthenticationContext)
    const [selectedInativeKnowledgeId, setSelectedInativeKnowledgeId] = useState(null);


    const handleOpenModal = (id) => {
        setSelectedInativeKnowledgeId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInativeKnowledgeId(null);
    };

    const fetchInactiveKnowledges = async () => {
        const response = await getAllInactiveKnowledges(filterTitle, elementsValue, page, selectedDomain, selectedCategory);
        setInactiveKnowledgeData(response.data.content);
        setData(response.data)
    };

    useEffect(() => {
        fetchInactiveKnowledges();
    }, [filterTitle, elementsValue, page, selectedCategory, selectedDomain]);

    const handleActivate = async (id) => {

        if (selectedInativeKnowledgeId) {
            await inactivateKnowledge(id);
            fetchInactiveKnowledges();
            toast.success("Conhecimento reativado com sucesso!");
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (inactiveKnowledgeData.length === 0 && page > 0) {
            setPage(page - 1)
        }
    }, [inactiveKnowledgeData])

    const handleElementValue = (elementsNumber) => {
        setElementsValue(elementsNumber)
    }

    const handlePagination = (pageNumber) => {
        setPage(pageNumber)
    }
    const handleSelectedDomain = (domainId) => {
        setSelectedDomain(domainId);
        setSelectedCategory(0)
    };
    const handleSelectedCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedDomain(0)
        console.log(selectedDomain)
    };


    return (
        <>
            <Container fluid>

                <SearchComponentKnowledge onSearch={setFilterTitle}/>
                <Row style={{marginBottom: 40}}>
                    <Col md={6}>
                        <ToggleSelectDomain domainSelected={selectedDomain} selectDomain={handleSelectedDomain}/>
                    </Col>
                    <Col md={6}>
                        <ToggleSelectCategory categorySelected={selectedCategory}
                                              selectCategory={handleSelectedCategory}/>
                    </Col>
                </Row>
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
                            <th style={{paddingLeft: 20}} colSpan="3">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(inactiveKnowledgeData) && inactiveKnowledgeData.map((knowledge) => (
                            <tr key={knowledge.id}>
                                <td>{knowledge.title}</td>
                                <td>
                                    {Array.isArray(knowledge.categories) && knowledge.categories.map((category) =>
                                            Array.isArray(category.domains) && category.domains.map((domain) => (
                                                <span key={domain.id}>{domain.name}</span>
                                            ))
                                    )}
                                </td>
                                <td>
                                    {Array.isArray(knowledge.categories) && knowledge.categories.map((category) => (
                                        <span key={category.id}>{category.name}</span>
                                    ))}
                                </td>
                                {/*<td>{knowledge.text}</td>*/}
                                <td>{knowledge.collaborator}</td>

                                <td className="action-column">
                                    <Button variant="link" onClick={() => handleOpenModal(knowledge.id)}>
                                        <MdAddCircleOutline/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <ModalComponent
                            confirmButton="Reativar"
                            tabIndex="-1"
                            bodyContent={"Deseja reativar"}
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
                </div>
            </TableStyle>
            <PaginationComponent changeElementsNumber={handleElementValue} changePage={handlePagination} data={data}/>
        </>
    );
}

export default TableInativeKnowledge;
