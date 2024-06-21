import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { getAllCategories, getCategoryById } from "../../servicesBack/CategoryServices";
import './styles.css';

const ToggleSelectCategory = ({ selectCategory, categorySelected }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState()
  const [categoryName, setCategoryName] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value;
    selectCategory(value);
    setSelectedCategory(value)
    console.log(value);
  };

  useEffect(() => {
    const handleSelectedName = async () => {
      const response = await getCategoryById(selectedCategory)
      setCategoryName(response.data.name)
      console.log(response.data)
    }
    handleSelectedName()
  }, [selectedCategory])

  return (
    <Dropdown className="full-width custom-dropdown">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-custom-components"
        className="full-width toggle-left"
      >
        {categoryName == null || categorySelected == 0 ? "Buscar Categoria" : categoryName}      </Dropdown.Toggle>

      <Dropdown.Menu className="full-width custom-dropdown-menu">
        <Dropdown.ItemText>Selecione uma Categoria:</Dropdown.ItemText>
        <Dropdown.Divider />
        {categories.map((category) => (
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
