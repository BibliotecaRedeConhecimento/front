import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  getAllDomains,
  getDomainById,
} from "../../servicesBack/DomainServices";

const ToggleSelectDomain = ({ selectDomain, domainSelected }) => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(0);
  const [domainName, setDomainName] = useState();
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await getAllDomains();
        setDomains(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar domínios:", error);
      }
    };
    fetchDomains();
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value;
    selectDomain(value);
    setSelectedDomain(value);
    console.log(value);
  };

  const handleReset = () => {
    selectDomain(0);
    setDomainName();
  };

  useEffect(() => {
    const handleSelectedName = async () => {
      if (selectedDomain !== 0) {
        const response = await getDomainById(selectedDomain);
        setDomainName(response.data.name);
      } else {
        console.log("NENHUM DOMINIO SELECIONADO");
      }
    };
    handleSelectedName();
  }, [selectedDomain]);

  return (
    <Dropdown className="full-width custom-dropdown">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-custom-components"
        className="full-width toggle-left"
      >
        {domainName == null || domainSelected == 0
          ? "Buscar por Dominio"
          : domainName}
      </Dropdown.Toggle>

      <Dropdown.Menu className="full-width custom-dropdown-menu">
        <Dropdown.ItemText>Selecione um Domínio:</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item className="full-width">
          <button
            type="button"
            className="dropdown-item full-width"
            onClick={handleReset}
          >
            Limpar Filtro
          </button>
        </Dropdown.Item>
        {domains.map((domain) => (
          <Dropdown.Item key={domain.id} className="full-width">
            <button
              type="button"
              className="dropdown-item full-width"
              value={domain.id}
              onClick={handleSelect}
            >
              {domain.name}
            </button>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ToggleSelectDomain;
