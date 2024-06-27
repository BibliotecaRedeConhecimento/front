import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchStyle } from "./styles.jsx";
import { useState } from "react";
import { toast } from 'react-toastify';

function SearchComponentKnowledge ({onSearch}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      onSearch('');
    } else {
      const result = await onSearch(searchTerm);
      if (result.length === 0) {
        toast.error('Nenhum conhecimento encontrado.');
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <SearchStyle style={{marginBottom: 20}}>
      <InputGroup className="mb-3">
        <Form.Control
        type="text"
        placeholder="Buscar por titulo do conhecimento..."
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

export default SearchComponentKnowledge;
