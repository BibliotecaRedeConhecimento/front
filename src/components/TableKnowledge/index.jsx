import Table from "react-bootstrap/Table";

import {RiDeleteBin6Line} from "react-icons/ri";
import {CiEdit} from "react-icons/ci";
import {BsEye} from "react-icons/bs";

import {TableStyle} from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import {Button, Container,} from "react-bootstrap";
import ButtonInative from "../ButtonInative/index.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getAllKnowledges, inactivateKnowledge} from "../../servicesBack/KnowledgeServices.js";
import {AuthenticationContext} from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";

function TableKnowledge() {

    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
      };
    


    const [knowledgeData, setKnowledgeData] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');

    const fetchKnowledges = async () => {
        const response = await getAllKnowledges(filterTitle)
        setKnowledgeData(response.data.content)
        console.log(response.data.content)
    }

    useEffect(() => {
        fetchKnowledges()
    }, [filterTitle])

    const handleInactivate = async (id) => {
        await inactivateKnowledge(id);
        fetchKnowledges();
      };

    const {isManager} = useContext(AuthenticationContext)

    return (
        <>
            <Container fluid>

                <SearchComponentKnowledge onSearch={setFilterTitle}/>
                
                <div className="d-flex justify-content-end mb-4">

                    

                    {isManager() ?

                    
                        <ButtonInative
                            size="10rem"
                            bgColor="var(--verde-primario3)"
                            textColor="white"
                            alternativeText="Categorias Inativas"
                            action={() => navigateTo("/conhecimentoInativo")}
                        >
                            Inativos
                        </ButtonInative>
                        : null
                    }
                </div>
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
                            <th style={{paddingLeft: 20}} colSpan="3">
                                Ações
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(knowledgeData) &&
                            knowledgeData.map((knowledge) => (
                                <tr key={knowledge.id}>
                                    <td>{knowledge.title}</td>
                                    <td>{Array.isArray(knowledge.categories) && knowledge.categories.map((category) => (
                                        Array.isArray(category.domains) && category.domains.map((domain) => (
                                            <span key={domain.id}>{domain.name}</span>
                                        ))
                                    ))}</td>
                                    <td>{Array.isArray(knowledge.categories) && knowledge.categories.map((category) => (
                                        <span key={category.id}>{category.name}</span>
                                    ))}</td>
                                    <td>{knowledge.text}</td>

                                    <td className="action-column">
                                        <Button variant="link"

                                        onClick={() => navigate(`/viewKnowledge/${knowledge.id}`)}>
                                            <BsEye className="visualizar-icon"/>
                                        </Button>
                                    </td>
                                    {isManager() ?
                                        <>

                                            <td className="action-column">
                                                <Button variant="link"
                                                        
                                                        onClick={() => navigate(`/buscarConhecimento/changeKnowledge/${knowledge.id}`)}>
                                                    <CiEdit className="edit-icon"/>
                                                </Button>
                                            </td>

                                        </>
                                        : null

                                    }
                                    {isManager() ?

                                        <td className="action-column" onClick={() => handleInactivate(knowledge.id)}>
                                            <RiDeleteBin6Line className="delete-icon"/>
                                        </td>
                                        : null
                                    }
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            </TableStyle>
            <PaginationComponent/>
        </>
    );
}

export default TableKnowledge;
