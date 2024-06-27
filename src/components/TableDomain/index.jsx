import Table from "react-bootstrap/Table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BsEye } from "react-icons/bs";
import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import { Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonInative from "../ButtonInative/index.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import SearchComponentDomain from "../SearchBarDomain/index.jsx";
import {
  getAllDomains,
  inactivateDomain,
} from "../../servicesBack/DomainServices.js";
import { toast } from "react-toastify";
import ModalComponent from "../../components/ModalComponent";

function TableDomain({ domain }) {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainData, setDomainData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [data, setData] = useState([]);
  const [elementsValue, setElementsValue] = useState(10);
  const [page, setPage] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedDomainId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDomainId(null);
  };

  const fetchDomain = async () => {
    setLoading(true);
    try {
      const response = await getAllDomains(filterName, elementsValue, page);
      setDomainData(response.data.content);
      setData(response.data);
      if (response.data.content.length === 0 && filterName.trim() !== "") {
        setNoResults(true); // Define true se a busca não retornar resultados
        toast.error("Nenhum domínio encontrado.");
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.error("Erro ao buscar um domínio.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomain();
  }, [filterName, page, elementsValue]);


  const handleInactivate = async (id) => {
    try {
      const response = await inactivateDomain(id);
      if (response && response.status === 200) {
        fetchDomain();
        toast.success("Domínio inativado com sucesso.");
        handleCloseModal();
      } else {
        toast.error("Erro ao inativar domínio. Verifique se há categorias relacionadas.");
      }
    } catch (error) {
      toast.error("Erro ao inativar domínio. Verifique se há categorias relacionadas.");
    }
  };

  const handleElementValue = (elementsNumber) => {
    setElementsValue(elementsNumber);
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (domainData.length === 0 && page > 0) {
      setPage(page - 1);
    }
  }, [domainData, page]);
  const { isManager } = useContext(AuthenticationContext);

  return (
    <>
      <Container fluid>
        <SearchComponentDomain onSearch={(value) => {
          setFilterName(value);
          return categoryData; // Retorne os dados filtrados ou um array vazio
        }} />

        {isManager() ? (
          <div className="d-flex justify-content-end mb-4">
            <ButtonInative
              size="10rem"
              bgColor="var(--verde-primario3)"
              textColor="white"
              alternativeText="Categorias Inativas"
              action={() => navigateTo("/dominioInativo")}
            >
              Inativos
            </ButtonInative>
          </div>
        ) : null}
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
                  <th colSpan="1">Domínio</th>
                  {isManager() ?
                    <th style={{ paddingLeft: 40 }} colSpan="2">
                      Ações
                    </th>
                    : null}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(domainData) &&
                  domainData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>

                      <td className="action-column">
                        {isManager() ? (
                          <>
                            <Button
                              variant="link"
                              style={{ color: "black" }}
                              onClick={() => navigate(`changeDomain/` + item.id)}
                            >
                              <CiEdit className="edit-icon" />
                            </Button>
                          </>
                        ) : null}
                      </td>
                      <td className="action-column">
                        {isManager() ? (
                          <Button
                            variant="link"
                            onClick={() => handleOpenModal(item.id)}
                          >
                            <RiDeleteBin6Line className="delete-icon" />
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <ModalComponent
                confirmButton="Inativar"
                tabIndex="-1"
                bodyContent={"Deseja inativar o domínio?"}
                show={showModal}
                handleClose={() => {
                  handleCloseModal();
                  toast.error("Operação cancelada pelo usuário.");
                }}
                confirm={() => handleInactivate(selectedDomainId)}
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

export default TableDomain;
