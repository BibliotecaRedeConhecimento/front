import Form from "react-bootstrap/Form";

import {PaginationStyle} from "./styles.jsx";
import {
    MdNavigateNext,
    MdNavigateBefore,
    MdLastPage,
    MdFirstPage,
} from "react-icons/md";
import {useEffect, useState} from "react";

function PaginationComponent({changeElementsNumber, data, changePage}) {
    const [elementsValue, setElementsValue] = useState();
    const [paginaAtual, setPaginaAtual] = useState(0);
    const handlElementsChange = (e) => {
        const newValue = e.target.value;
        setElementsValue(newValue);
        changeElementsNumber(newValue);
    };

    const handlePageChange = (valor) => {
        setPaginaAtual(valor);
        changePage(valor);
    };

    useEffect(() => {
        if (data.totalElements === 0 || data.totalPages === 0) {
            setPaginaAtual(0);
        } else {
            setPaginaAtual(data?.pageable?.pageNumber);
        }
    }, [data?.pageable?.pageNumber, data?.totalElements, data.totalPages]);

    return (
        <PaginationStyle style={{marginTop: 20}}>
            <Form.Select
                className="select-per-page"
                value={elementsValue}
                onChange={handlElementsChange}
            >
                {" "}
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </Form.Select>
            <div>
                <span>Total de registros: {data.totalElements}</span>
            </div>
            <div className="area-paginacao">
                <div>
                    <MdFirstPage onClick={() => handlePageChange(0)}/>
                </div>
                <div>
                    <MdNavigateBefore
                        onClick={() => {
                            if (paginaAtual > 0) handlePageChange(paginaAtual - 1)
                        }}
                        disabled={paginaAtual === 0}
                        style={{color: paginaAtual === 0 ? '#ccc' : 'inherit'}}
                    />
                </div>
                <div>
                    <div>
            <span>
              {data.totalElements === 0 ? "0" : paginaAtual + 1} de {data.totalPages}
            </span>
                    </div>
                </div>
                <div>
                    <MdNavigateNext
                        onClick={() => {
                            if (paginaAtual < data.totalPages - 1)
                                handlePageChange(paginaAtual + 1);
                        }}
                    />
                </div>
                <div>
                    <MdLastPage onClick={() => handlePageChange(data.totalPages - 1)}/>
                </div>
            </div>
        </PaginationStyle>
    );
}

export default PaginationComponent;