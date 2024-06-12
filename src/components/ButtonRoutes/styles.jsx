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
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    &:hover {
        background-color: var(--verde-terceario);
`;