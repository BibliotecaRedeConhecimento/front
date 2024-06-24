import styled from "styled-components";

export const SearchStyle = styled.div`
  .input-group {
    display: flex;
    
    
  }

  .form-control {
    outline: none !important;        
    box-shadow: none !important;
    padding: 8px;
    border-radius: 5px 0 0 5px;    
    border: 1px solid #D9D9D9 !important;
    width: calc(100% - 42px); /* Ajustar para o espaço do botão */
    
    &:focus{           
        border-bottom: 2px solid var(--verde-primario) !important;
        border: 0px;
        border-radius: 5px 0 0 5px;       
    } 
  }

  .btn-outline-secondary {
    border-radius: 0 5px 5px 0;
    border: 1px solid #D9D9D9;
    border-left: none !important;
    background-color: var(--verde-primario) !important;
    width: 40px;
    color: white;
    
    &:hover {
      background-color: var(--verde-primario);
      color: white;
    }
  }
`;
