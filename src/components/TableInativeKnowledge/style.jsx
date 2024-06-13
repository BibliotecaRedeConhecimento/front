import styled from "styled-components";

export const TableStyle = styled.div`
  .table-area {
    width: 100%;
    background-color: var(--branco) !important;
    overflow-x: auto; /* Permite rolagem horizontal em telas menores */
    
  }

  .table {
    width: 100%;
    min-width: 600px;
    thead {
        th {
          text-align: left;
          
        }
      }
    tbody {
      tr {
        td {
          border-bottom: none !important;
        }        
      }

      .action-column {
        text-align: center;

        #delete-icon {
          color: var(--vermelho-perigo);
          &:hover {
            color: var(--verde-primario);
            cursor: pointer;
          }
        }

        svg {
          font-size: 24px;
          &:hover {
            color: var(--verde-primario);
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
