import Table from "react-bootstrap/Table";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";

import { Button, Container, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import {
  getAllInactiveCategory,
  inactivateCategory,
} from "../../servicesBack/CategoryServices.js";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import { toast } from "react-toastify";
import ModalComponent from "../../components/ModalComponent";

function TableInativeCategory() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isManager } = useContext(AuthenticationContext);
  const [inactiveCategoryData, setInactiveCategoryData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [data, setData] = useState([]);
  const [elementsValue, setElementsValue] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedInativeCategoryId, setSelectedInativeCategoryId] =
    useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleOpenModal = (id) => {
    setSelectedInativeCategoryId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInativeCategoryId(null);
  };

  const fetchInactiveCategory = async () => {
    setLoading(true);
    try {
      const response = await getAllInactiveCategory(
        filterName,
        elementsValue,
        page
      );
      setInactiveCategoryData(response.data.content);
      setData(response.data);
      if (response.data.content.length === 0 && filterName.trim() !== "") {
        setNoResults(true); // Define true se a busca não retornar resultados
        toast.error("Nenhuma categoria encontrada.");
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.error("Erro ao buscar uma categoria.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInactiveCategory();
  }, [filterName, elementsValue, page]);

  const handleActivate = async (id) => {
    try {
      const response = await inactivateCategory(id);
      if (response && response.status >= 200 && response.status < 300) {
        fetchInactiveCategory();
        toast.success("Categoria ativada com sucesso.");
        handleCloseModal();
      } else {
        toast.error(
          "Erro ao ativar categoria. Verifique se há domínios relacionados inativos."
        );
      }
    } catch (error) {
      toast.error("Erro ao ativar categoria.");
    }
  };

  const handleElementValue = (elementsNumber) => {
    setElementsValue(elementsNumber);
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (inactiveCategoryData.length === 0 && page > 0) {
      setPage(page - 1);
    }
  }, [inactiveCategoryData]);

  return (
    <>
      <Container fluid>
        <SearchComponentKnowledge onSearch={setFilterName} />
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
                  <th colSpan="1">Categoria</th>
                  <th colSpan="1">Domínio</th>

                  {isManager() ? (
                    <th style={{ textAlign: "center" }} colSpan="3">
                      Ações
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(inactiveCategoryData) &&
                  inactiveCategoryData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        {Array.isArray(item.domains) &&
                          item.domains.map((domain) => (
                            <span key={domain.id}>{domain.name}</span>
                          ))}
                      </td>

                      {isManager() ? (
                        <td className="action-column">
                          <Button
                            variant="link"
                            onClick={() => handleOpenModal(item.id)}
                          >
                            <MdAddCircleOutline />
                          </Button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
              </tbody>
              <ModalComponent
                confirmButton="Reativar"
                tabIndex="-1"
                bodyContent={"Deseja reativar a categoria?"}
                show={showModal}
                handleClose={() => {
                  handleCloseModal();
                  toast.error("Operação cancelada pelo usuário.");
                }}
                confirm={() => handleActivate(selectedInativeCategoryId)}
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

export default TableInativeCategory;
