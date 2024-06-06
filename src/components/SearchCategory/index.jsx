import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchStyle } from "./styles.jsx";

function SearchComponentCategory() {
  return (
    <SearchStyle style={{marginBottom: 40}}>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Digite uma categoria..." />
        <Button variant="outline-secondary">
          <AiOutlineSearch />
        </Button>
      </InputGroup>
    </SearchStyle>
  );
}

export default SearchComponentCategory;
