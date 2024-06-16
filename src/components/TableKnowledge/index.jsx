import Table from "react-bootstrap/Table";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import SearchComponentCategory from "../SearchBar/index.jsx";
import { Container, } from "react-bootstrap";
import ButtonInative from "../ButtonInative/index.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllKnowledges } from "../../servicesBack/KnowledgeServices.js";

function TableKnowledge() {

  const navigate = useNavigate()



  const [knowledgeData, setKnowledgeData] = useState([])

  const fetchKnowledges = async () => {
    const response = await getAllKnowledges()
    setKnowledgeData(response.data.content)
    console.log(response.data.content)
  }

  useEffect(() => {
    fetchKnowledges()
  }, [])

  return (
    <>
      <Container fluid>
        <SearchComponentCategory />
        <div className="d-flex justify-content-end mb-4">
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
                      <button onClick={() => navigate(`/viewKnowledge/${knowledge.id}`)}>
                        <BsEye />
                      </button>
                    </td>
                    <td className="action-column">
                      <button onClick={() => navigate(`/buscarConhecimento/changeKnowledge/${knowledge.id}`)}>
                      <CiEdit />
                      </button>
                    </td>
                    <td className="action-column">
                      <RiDeleteBin6Line id="delete-icon" />
                    </td>
                  </tr>
                ))}

            </tbody>
          </Table>
        </div>
      </TableStyle>
      <PaginationComponent />
    </>
  );
}

export default TableKnowledge;
