import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const ButtonRoutesStyle = styled(Button)`
    background-color: var(--verde-primario) ;
    color: var(--branco-primario);
    
    border: none;
    border-radius: 4px;
    width: 20rem;
    height: 7rem;
    font-size: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    transition: 0.3s;

        &:hover{
            filter: brightness(0.8);
            background-color: #0F6E58;
        }
`;

