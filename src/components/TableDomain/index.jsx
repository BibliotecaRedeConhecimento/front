import Table from "react-bootstrap/Table";

import {RiDeleteBin6Line} from "react-icons/ri";
import {CiEdit} from "react-icons/ci";
import {BsEye} from "react-icons/bs";

import {TableStyle} from "./styles.jsx";
import PaginationComponent from "../TablePagination/index.jsx";


import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ButtonInative from "../ButtonInative/index.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../../services/context/AuthContext";
import SearchComponentDomain from "../SearchBarDomain/index.jsx";
import { getAllDomains, inactivateDomain } from "../../servicesBack/DomainServices.js";

function TableDomain({domain}) {

    const navigate = useNavigate()
    const navigateTo = (path) => {
        navigate(path);
    };

    const [filterName, setFilterName] = useState('');
    const [domainData, setDomainData] = useState([]);
    

    const fetchDomain = async () => {
        try {
          const response = await getAllDomains(filterName);
          setDomainData(response.data.content);
        } catch (error) {
          console.error('Erro ao buscar domínios', error);
        }
      };

      useEffect(() => {
        fetchDomain();
      }, [filterName]);

      const handleInactivate = async (id) => {
        await inactivateDomain(id);
        fetchDomain();
    };


    const {isManager} = useContext(AuthenticationContext)


    return (
        <>
            <Container fluid>

                <SearchComponentDomain onSearch={setFilterName}/>
                
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
                        {Array.isArray(domainData) && domainData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.domain}</td>
                                <td className="action-column">
                                    {isManager() ?
                                        <>
                                            <Button variant="link"
                                                    style={{color: "black"}}
                                                    onClick={() => navigate(`changeDomain/` + item.id)}>
                                                <CiEdit className="edit-icon"/>
                                            </Button>
                                        </> : null}
                                </td>
                                <td className="action-column">
                                    {isManager() ?
                                       <Button variant="link" onClick={() => handleInactivate(item.id)}>
                                       <RiDeleteBin6Line className="delete-icon"/>
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

export default TableDomain;
