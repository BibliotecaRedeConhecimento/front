import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { SearchStyle } from "./styles.jsx";

function SearchComponent() {
  return (
    <SearchStyle style={{marginBottom: 20}}>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Filtro por qualquer coluna da tabela..." />
      </InputGroup>
    </SearchStyle>
  );
}

export default SearchComponent;