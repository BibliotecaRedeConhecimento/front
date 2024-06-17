import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchStyle } from "./styles.jsx";
import { useState } from "react";

function SearchComponentCategory({onSearch}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <SearchStyle style={{marginBottom: 40}}>
      <InputGroup className="mb-3">
        <Form.Control
        type="text"
        placeholder="Buscar por nome da categoria..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}/>
        <Button variant="outline-secondary" onClick={handleSearch}>
          <AiOutlineSearch />
        </Button>
      </InputGroup>
    </SearchStyle>
  );
}

export default SearchComponentCategory;
