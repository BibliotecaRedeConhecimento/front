import styled from "styled-components";


export const PaginationStyle = styled.div`
   

  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--cinza-primario);
  
  border-radius: 5px;
  padding: 0.5rem;
  color: var(--preto-primario);

  select {
    outline: none !important;
    box-shadow: none !important;
    

    &:focus {
      border-bottom: 2px solid var(--verde-primario) !important;
      border: 0px;
    }
  }

  .select-per-page {
    width: 10%;
    min-width: 5rem;
    border-radius: 0 !important;
    color: var(--preto-primario2);
    

    &:focus {
      outline: none !important;
    }
  }

  .area-paginacao {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;

    

    svg {
      font-size: 24px;
      color: var(--preto-primario);
      

      &:hover {
        color: var(--verde-primario);        
        cursor: pointer;
      }
    }
  }
`;