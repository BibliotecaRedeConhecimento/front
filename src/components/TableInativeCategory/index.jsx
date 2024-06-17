import Table from "react-bootstrap/Table";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";


import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { getAllInactiveCategory, inactivateCategory } from "../../servicesBack/CategoryServices.js";


function TableInativeCategory() {
  const { isManager } = useContext(AuthenticationContext);
  const [inactiveCategoryData, setInactiveCategoryData] = useState([]);

  const fetchInactiveCategory = async () => {
    const response = await getAllInactiveCategory();
    setInactiveCategoryData(response.data.content);
  };

  useEffect(() => {
    fetchInactiveCategory();
  }, []);

  const handleActivate = async (id) => {
    await inactivateCategory(id);
    fetchInactiveCategory();
  };

  return (
    <>
      <Container fluid>

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
                      <Button variant="link" onClick={() => handleActivate(item.id)}>
                        <MdAddCircleOutline />
                      </Button>
                    </td>
                    : null
                  }
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

export default TableInativeCategory;
