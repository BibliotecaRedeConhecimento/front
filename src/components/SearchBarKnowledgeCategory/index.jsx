import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { getAllCategories } from "../../servicesBack/CategoryServices";

const ToggleSelectCategory = ({ selectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar domínios:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value;
    selectCategory(value);
    console.log(value);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-custom-components">
        Buscar por Domínios
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.ItemText>Selecione um Domínio:</Dropdown.ItemText>
        <Dropdown.Divider />
        {categories.map((category) => (
          <Dropdown.Item key={category.id}>
            <button
              type="button"
              className="dropdown-item"
              value={category.id}
              onClick={handleSelect}
            >
              {category.name}
            </button>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ToggleSelectCategory;
