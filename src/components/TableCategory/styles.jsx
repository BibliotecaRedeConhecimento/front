import styled from "styled-components";

export const TableStyle = styled.div`
  .table-area {
    width: 100%;
    
    
    overflow-x: auto; /* Permite rolagem horizontal em telas menores */
    
  }

  .table {
    width: 100%;
    min-width: 600px;
    thead {
    
    color: var(--preto-primario) !important;}
    

    tbody {
      
      }

      tr {
        td {
          color: var(--preto-primario) !important;
          border-bottom: none !important;
        }
      }


      .action-column {
        text-align: center;

      .edit-icon {
        color: var(--preto-primario); 
  }

      .delete-icon {
         color: var(--vermelho-constraste); 
  }
        

       
        svg {
          font-size: 24px;
          &:hover {
            color: var(--preto-primario2);
            
            cursor: pointer;
          }
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    .table-area {
      overflow-y: scroll !important; /* Mantém o scroll vertical */
    }
  }
`;
