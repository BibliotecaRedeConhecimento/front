import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { RiArrowDownSFill } from "react-icons/ri";
import { SearchStyle } from "./styles.jsx";

function SearchComponentDomain() {
  return (
    <SearchStyle style={{marginBottom: 40}}>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Selecione um domínio..." />
        <Button variant="outline-secondary">
          <RiArrowDownSFill />
        </Button>
      </InputGroup>
    </SearchStyle>
  );
}

export default SearchComponentDomain;
