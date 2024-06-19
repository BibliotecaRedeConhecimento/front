import Table from "react-bootstrap/Table";
import { MdAddCircleOutline } from "react-icons/md";
import { TableStyle } from "./style.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import { Container, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { getAllInactiveKnowledges, inactivateKnowledge } from "../../servicesBack/KnowledgeServices.js";
import { AuthenticationContext } from "../../services/context/AuthContext";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";

function TableInativeKnowledge() {
  const { isManager } = useContext(AuthenticationContext);
  const [inactiveKnowledgeData, setInactiveKnowledgeData] = useState([]);
  const [data, setData] = useState([])
  const [elementsValue, setElementsValue] = useState()
  const [page, setPage] = useState()
  const [filterTitle, setFilterTitle] = useState('');


  const fetchInactiveKnowledges = async () => {
    const response = await getAllInactiveKnowledges(filterTitle, elementsValue, page);
    setInactiveKnowledgeData(response.data.content);
    setData(response.data)
  };

  useEffect(() => {
    fetchInactiveKnowledges();
  }, [filterTitle, elementsValue, page]);

  const handleActivate = async (id) => {
    await inactivateKnowledge(id);
    fetchInactiveKnowledges();
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

        <SearchComponentKnowledge onSearch={setFilterTitle} />

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
                  <td>{knowledge.text}</td>
                  <td className="action-column">
                    <Button variant="link" onClick={() => handleActivate(knowledge.id)}>
                      <MdAddCircleOutline />
                    </Button>
                  </td>
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

export default TableInativeKnowledge;
