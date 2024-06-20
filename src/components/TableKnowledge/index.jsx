import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import { Button, Col, Row, Container } from "react-bootstrap";
import ButtonInative from "../ButtonInative/index.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getAllKnowledges,
  inactivateKnowledge,
} from "../../servicesBack/KnowledgeServices.js";
import { AuthenticationContext } from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import ToggleSelectDomain from "../SearchBarKnowledgeDomain/index.jsx";
import ToggleSelectCategory from "../SearchBarKnowledgeCategory/index.jsx";
import { toast } from 'react-toastify';


function TableKnowledge() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  const [knowledgeData, setKnowledgeData] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [elementsValue, setElementsValue] = useState();
  const [page, setPage] = useState();
  const [data, setData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [noResults, setNoResults] = useState(false);

  const fetchKnowledges = async () => {
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
    if (response.data.content.length === 0 && filterTitle.trim() !== '') {
      setNoResults(true); // Define true se a busca não retornar resultados
      toast.error('Nenhum conhecimento encontrado.');
  } else {
      setNoResults(false);
  }
  };

  useEffect(() => {
    fetchKnowledges();
  }, [filterTitle, page, elementsValue, selectedDomain, selectedCategory]);

  const handleInactivate = async (id) => {
    await inactivateKnowledge(id);
    fetchKnowledges();
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
    setSelectedCategory(0)
  };
  const handleSelectedCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedDomain(0)
  };


  const { isManager } = useContext(AuthenticationContext);

  return (
    <>
      <Container fluid>
        <SearchComponentKnowledge onSearch={setFilterTitle} />
        <Row style={{marginBottom: 40}}>
          <Col md={6}>
            <ToggleSelectDomain selectDomain={handleSelectedDomain} />
          </Col>
          <Col md={6}>
            <ToggleSelectCategory selectCategory={handleSelectedCategory} />
          </Col>
        </Row>
        <div className="d-flex justify-content-end mb-4">
          {isManager() ? (
            <ButtonInative
              size="10rem"
              bgColor="var(--verde-primario3)"
              textColor="white"
              alternativeText="Categorias Inativas"
              action={() => navigateTo("/conhecimentoInativo")}
            >
              Inativos
            </ButtonInative>
          ) : null}
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
                <th style={{ paddingLeft: 20 }} colSpan="3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(knowledgeData) &&
                knowledgeData.map((knowledge) => (
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
                    <td>{knowledge.text}</td>

                    <td className="action-column">
                      <Button
                        variant="link"
                        onClick={() =>
                          navigate(`/viewKnowledge/${knowledge.id}`)
                        }
                      >
                        <BsEye className="visualizar-icon" />
                      </Button>
                    </td>
                    {isManager() ? (
                      <>
                        <td className="action-column">
                          <Button
                            variant="link"
                            onClick={() =>
                              navigate(
                                `/buscarConhecimento/changeKnowledge/${knowledge.id}`
                              )
                            }
                          >
                            <CiEdit className="edit-icon" />
                          </Button>
                        </td>
                      </>
                    ) : null}
                    {isManager() ? (
                      <td
                        className="action-column"
                        onClick={() => handleInactivate(knowledge.id)}
                      >
                        <RiDeleteBin6Line className="delete-icon" />
                      </td>
                    ) : null}
                  </tr>
                ))}
            </tbody>
          </Table>
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

export default TableKnowledge;
