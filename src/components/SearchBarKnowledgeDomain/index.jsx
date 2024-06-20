import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { getAllDomains } from "../../servicesBack/DomainServices";

const ToggleSelectDomain = ({ selectDomain }) => {
  const [domains, setDomains] = useState([]);

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
    console.log(value);
  };

  return (
    <Dropdown className="full-width custom-dropdown">
      <Dropdown.Toggle variant="success" id="dropdown-custom-components"
      className="full-width toggle-left">
        Buscar por Domínios
      </Dropdown.Toggle>

      <Dropdown.Menu className="full-width custom-dropdown-menu">
        <Dropdown.ItemText>Selecione um Domínio:</Dropdown.ItemText>
        <Dropdown.Divider />
        {domains.map((domain) => (
          <Dropdown.Item key={domain.id}
          className="full-width">
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
