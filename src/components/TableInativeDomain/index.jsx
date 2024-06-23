import Table from "react-bootstrap/Table";
import { Button, Container, Spinner } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { getAllInactiveDomain, inactivateDomain } from "../../servicesBack/DomainServices.js";
import SearchComponentDomain from "../SearchBarDomain/index.jsx";
import ModalComponent from "../../components/ModalComponent";

function TableInativeDomain() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isManager } = useContext(AuthenticationContext);
  const [inactiveDomainData, setInactiveDomainData] = useState([]);
  const [data, setData] = useState([]);
  const [elementsValue, setElementsValue] = useState();
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [selectedInativeDomainId, setSelectedInativeDomainId] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleOpenModal = (id) => {
    setSelectedInativeDomainId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInativeDomainId(null);
  };

  const fetchInactiveDomain = async () => {
    setLoading(true);
    try {
      const response = await getAllInactiveDomain(filterName, elementsValue, page);
      setInactiveDomainData(response.data.content);
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
    };
  };

    useEffect(() => {
      fetchInactiveDomain();
    }, [filterName, elementsValue, page]);

    useEffect(() => {
      if (inactiveDomainData.length === 0 && page > 0) {
        setPage(page - 1);
      }
    }, [inactiveDomainData]);

    const handleActivate = async (id) => {
      try {
        await inactivateDomain(id);
        fetchInactiveDomain();
        toast.success("Domínio ativado com sucesso.");
        handleCloseModal();
      } catch (error) {
        toast.error("Erro ao ativar domínio.");
      }
    };

    const handleElementValue = (elementsNumber) => {
      setElementsValue(elementsNumber);
    };

    const handlePagination = (pageNumber) => {
      setPage(pageNumber);
    };

    return (
      <>
        <Container fluid>
          <SearchComponentDomain onSearch={setFilterName} />
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
                    <th>Domínio</th>
                    {isManager() ? <th style={{ textAlign: 'center' }} colSpan="3">Ações</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(inactiveDomainData) && inactiveDomainData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="action-column">
                        {isManager() ? (
                          <Button variant="link" onClick={() => handleOpenModal(item.id)}>
                            <MdAddCircleOutline />
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <ModalComponent
                  confirmButton="Reativar"
                  tabIndex="-1"
                  bodyContent="Deseja reativar o domínio?"
                  show={showModal}
                  handleClose={handleCloseModal}
                  confirm={() => handleActivate(selectedInativeDomainId)}
                  cancel={() => {
                    handleCloseModal();
                    toast.error("Operação cancelada pelo usuário.");
                  }}
                />
              </Table>
            )}
          </div>
        </TableStyle>
        <PaginationComponent changeElementsNumber={handleElementValue} changePage={handlePagination} data={data} />
      </>
    );
  
}

export default TableInativeDomain;
