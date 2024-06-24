import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  getAllCategories,
  getCategoryById,
} from "../../servicesBack/CategoryServices";
import "./styles.css";

const ToggleSelectCategory = ({ selectCategory, domainSelected }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(null, 50, 0);
        setCategories(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (domainSelected) {
      const domainId = parseInt(domainSelected);
      const filtered = categories.filter((category) =>
        category.domains.some((domain) => domain.id === domainId)
      );
      setFilteredCategories(filtered);
      handleReset();
    } else {
      setFilteredCategories(categories);
      handleReset();
    }
  }, [categories, domainSelected]);

  const handleSelect = async (e) => {
    const value = e.target.value;
    selectCategory(value);
    setSelectedCategory(value); // Define o ID da categoria selecionada
    try {
      const response = await getCategoryById(value); // Utiliza o valor atual de 'value'
      setCategoryName(response.data.name);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar nome da categoria:", error);
    }
  };

  const handleReset = () => {
    selectCategory(0);
    setCategoryName();
  };
  return (
    <Dropdown className="full-width custom-dropdown">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-custom-components"
        className="full-width toggle-left"
      >
        {(categoryName == null && categoryName == undefined) ||
        selectedCategory == 0
          ? "Buscar Categoria"
          : categoryName}{" "}
      </Dropdown.Toggle>

      <Dropdown.Menu className="full-width custom-dropdown-menu">
        <Dropdown.ItemText>Selecione uma Categoria:</Dropdown.ItemText>
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
        {filteredCategories.map((category) => (
          <Dropdown.Item key={category.id} className="full-width">
            <button
              type="button"
              className="dropdown-item full-width"
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
