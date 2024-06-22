import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";

import { Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { getAllInactiveDomain, inactivateDomain } from "../../servicesBack/DomainServices.js";
import SearchComponentDomain from "../SearchBarDomain/index.jsx";
import ModalComponent from "../../components/ModalComponent";
import { toast } from "react-toastify";

function TableInativeDomain() {

  const [showModal, setShowModal] = useState(false);
  const { isManager } = useContext(AuthenticationContext)
  const [inactiveDomainData, setInactiveDomainData] = useState([]);
  const [data, setData] = useState([])
  const [elementsValue, setElementsValue] = useState()
  const [page, setPage] = useState()
  const [filterName, setFilterName] = useState('');
  const [selectedInativeDomainId, setSelectedInativeDomainId] = useState(null);

  const handleOpenModal = (id) => {
    console.log('este modal foi aberto')
    setSelectedInativeDomainId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInativeDomainId(null);
  };

  const fetchInactiveDomain = async () => {
    const response = await getAllInactiveDomain(filterName, elementsValue, page);
    setInactiveDomainData(response.data.content);
    setData(response.data)
  };

  useEffect(() => {
    fetchInactiveDomain();
  }, [filterName, elementsValue, page]);


  useEffect(() => {
    if (inactiveDomainData.length === 0 && page > 0) {
      setPage(page - 1)
    }
  }, [inactiveDomainData])

  const handleActivate = async (id) => {

    if (selectedInativeDomainId) {
    await inactivateDomain(id);
    fetchInactiveDomain();
    toast.success("Domínio reativado com sucesso!");
    handleCloseModal();
    }
  };

  
  const handleElementValue = (elementsNumber) => {
    setElementsValue(elementsNumber)
  }

  const handlePagination = (pageNumber) => {
    setPage(pageNumber)
  }

  return (
    <>
      <Container fluid>
        <SearchComponentDomain onSearch={setFilterName} />

      </Container>
      <TableStyle>
        <div className="table-area">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th colSpan="1">Domínio</th>
                <th style={{ paddingLeft: 20 }} colSpan="3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inactiveDomainData) && inactiveDomainData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.domain}</td>
                  <td className="action-column">
                    {isManager() ?
                      <Button 
                      variant="link" 
                      onClick={() => handleOpenModal(item.id)}>
                        <MdAddCircleOutline />
                      </Button>
                      : null
                    }
                  </td>
                </tr>
              ))}
            </tbody>
            <ModalComponent
              confirmButton="Reativar"
              tabIndex="-1"
              bodyContent={"Deseja reativar o domínio?"}
              show={showModal}
              handleClose={() => {
                handleCloseModal();
                toast.error("Operação cancelada pelo usuário.");
              }}
              confirm={handleActivate}
              cancel={() => {
                handleCloseModal();
                toast.error("Operação cancelada pelo usuário.");
              }}
              />
          </Table>
        </div>
      </TableStyle>
      <PaginationComponent changeElementsNumber={handleElementValue} changePage={handlePagination} data={data} />
    </>
  );
}

export default TableInativeDomain;
