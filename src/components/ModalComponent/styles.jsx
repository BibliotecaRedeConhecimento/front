import styled from 'styled-components';
import Button from 'react-bootstrap/Button';


export const ModalButtonStyle = styled(Button)`
  background-color: var(--verde-primario);
  border: none;
  

  &:hover{
            filter: brightness(0.8);
            background-color: var(--verde-primario4);
        }
`;