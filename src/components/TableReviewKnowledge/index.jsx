import Table from "react-bootstrap/Table";
import {MdAddCircleOutline} from "react-icons/md";
import {TableStyle} from "./style.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import {Container, Button} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {
    getAllNeedsReviewKnowledges,
    acceptKnowledge
} from "../../servicesBack/KnowledgeServices.js";
import {AuthenticationContext} from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import {BsEye} from "react-icons/bs";
import {CiEdit} from "react-icons/ci";
import {RiDeleteBin6Line} from "react-icons/ri";
import {IoMdAddCircleOutline} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import ModalComponent from "../ModalComponent";

function TableReviewKnowledge() {
    const {isManager} = useContext(AuthenticationContext);
    const [inactiveKnowledgeData, setInactiveKnowledgeData] = useState([]);
    const [data, setData] = useState([])
    const [elementsValue, setElementsValue] = useState(10)
    const [page, setPage] = useState(0)
    const [filterTitle, setFilterTitle] = useState('');
    const {user} = useContext(AuthenticationContext)
    const [selectedForReview, setSelectedForReview] = useState(0)
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedForReview(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedForReview(0);
    };

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    };
    const fetchKnowledgesForReview = async () => {
        const response = await getAllNeedsReviewKnowledges(elementsValue, page);
        setInactiveKnowledgeData(response.data.content);
        setData(response.data)
    };

    useEffect(() => {
        fetchKnowledgesForReview();
    }, [filterTitle, elementsValue, page]);

    const handleAccept = async id => {
        await acceptKnowledge(id);
        fetchKnowledgesForReview();
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

    return (
        <>
            <Container fluid>

                <SearchComponentKnowledge onSearch={setFilterTitle}/>

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
                            <th style={{paddingLeft: 20}} colSpan="1">Ações</th>
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
                                <td>{knowledge.collaborator}</td>
                                {/*<td>{knowledge.text}</td>*/}
                                <td className="action-column">
                                    <Button variant="link"
                                            style={{color: "black"}}
                                            onClick={() => navigateTo(`/viewKnowledge/${knowledge.id}`)}>
                                        <BsEye className="visualizar-icon"/>
                                    </Button>
                                </td>
                                {isManager() ?
                                    <>

                                        <td className="action-column">
                                            <Button variant="link"
                                                    style={{color: "black"}}
                                                    onClick={() => navigateTo(`/buscarConhecimento/changeKnowledge/${knowledge.id}`)}>
                                                <CiEdit className="edit-icon"/>
                                            </Button>
                                        </td>

                                    </>
                                    : null

                                }
                                {isManager() ?

                                    <td className="action-column" onClick={() => handleOpenModal(knowledge.id)}>
                                        <IoMdAddCircleOutline className="add-icon"/>
                                    </td>
                                    : null
                                }
                            </tr>
                        ))}
                        </tbody>
                        <ModalComponent
                            confirmButton="Reativar"
                            tabIndex="-1"
                            bodyContent={"Deseja aceitar esse conhecimento?"}
                            show={showModal}
                            handleClose={() => {
                                handleCloseModal();
                                toast.error("Operação cancelada pelo usuário.");
                            }}
                            confirm={() => handleAccept(selectedForReview)}
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

export default TableReviewKnowledge;
