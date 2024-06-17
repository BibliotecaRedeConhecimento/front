import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import { MdAddCircleOutline } from "react-icons/md";

import { TableStyle } from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";

import { Container } from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../../services/context/AuthContext";
import { getAllInactiveDomain, inactivateDomain } from "../../servicesBack/DomainServices.js";

function TableInativeDomain() {
  const {isManager} = useContext(AuthenticationContext)
  const [inactiveDomainData, setInactiveDomainData] = useState([]);

  const fetchInactiveDomain = async () => {
    const response = await getAllInactiveDomain();
    setInactiveDomainData(response.data.content);
  };

  useEffect(() => {
    fetchInactiveDomain();
  }, []);

  const handleActivate = async (id) => {
    await inactivateDomain(id);
    fetchInactiveDomain();
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
                            <th colSpan="1">Domínio</th>
                            <th style={{paddingLeft: 20}} colSpan="3">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(inactiveDomainData) && inactiveDomainData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.domain}</td>
                                <td className="action-column">
                                    {isManager() ?
                                       <Button variant="link" onClick={() => handleActivate(item.id)}>
                                       <MdAddCircleOutline />
                                   </Button>
                                        : null
                                    }
                                </td>
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

export default TableInativeDomain;
