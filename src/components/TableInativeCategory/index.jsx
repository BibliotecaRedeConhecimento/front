import Table from "react-bootstrap/Table";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";


import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { getAllInactiveCategory, inactivateCategory } from "../../servicesBack/CategoryServices.js";
import SearchComponentKnowledge from "../SearchBarKnowledge/index.jsx";
import { toast } from 'react-toastify';
import ModalComponent from "../../components/ModalComponent";

function TableInativeCategory() {
  const [showModal, setShowModal] = useState(false);
  const { isManager } = useContext(AuthenticationContext);
  const [inactiveCategoryData, setInactiveCategoryData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [data, setData] = useState([])
  const [elementsValue, setElementsValue] = useState()
  const [page, setPage] = useState()
  const [selectedInativeCategoryId, setSelectedInativeCategoryId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedInativeCategoryId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInativeCategoryId(null);
  };

  const fetchInactiveCategory = async () => {
    const response = await getAllInactiveCategory(filterName, elementsValue, page);
    setInactiveCategoryData(response.data.content);
    setData(response.data)
  };

  useEffect(() => {
    fetchInactiveCategory();
  }, [filterName, elementsValue, page]);

  const handleActivate = async (id) => {
    if (selectedInativeCategoryId){
    await inactivateCategory(id);
    fetchInactiveCategory();
    toast.success("Categoria reativada com sucesso!");
    handleCloseModal();
  }
  };

  const handleElementValue = (elementsNumber) => {
    setElementsValue(elementsNumber)
}

const handlePagination = (pageNumber) => {
    setPage(pageNumber)
}

useEffect(() => {
    if (inactiveCategoryData.length === 0 && page > 0) {
        setPage(page - 1)
    }
}, [inactiveCategoryData])

  return (
    <>
      <Container fluid>
      <SearchComponentKnowledge onSearch={setFilterName} />
      </Container>
      <TableStyle>
        <div className="table-area">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th colSpan="1">Categoria</th>
      
                <th style={{ paddingLeft: 20 }} colSpan="3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(inactiveCategoryData) && inactiveCategoryData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>


                  {isManager() ?
                    <td className="action-column">
                      <Button variant="link" onClick={() => handleOpenModal(item.id)}>
                        <MdAddCircleOutline />
                      </Button>
                    </td>
                    : null
                  }
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

export default TableInativeCategory;
