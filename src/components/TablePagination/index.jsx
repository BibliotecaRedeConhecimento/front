import Form from "react-bootstrap/Form";

import { PaginationStyle } from "./styles.jsx";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdLastPage,
  MdFirstPage,
} from "react-icons/md";

function PaginationComponent() {
  return (
    <PaginationStyle style={{marginTop: 20}}>
      <Form.Select className="select-per-page" value="10">
        <option>10</option>
      </Form.Select>
      <div>
        <span>Total de registros: 100</span>
      </div>
      <div className="area-paginacao">
        <div>
          <MdFirstPage />
        </div>
        <div>
          <MdNavigateBefore />
        </div>
        <div>
          <span>1 de 100</span>
        </div>
        <div>
          <MdNavigateNext />
        </div>
        <div>
          <MdLastPage />
        </div>
      </div>
    </PaginationStyle>
  );
}

export default PaginationComponent;