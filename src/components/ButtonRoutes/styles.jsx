import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const ButtonRoutesStyle = styled(Button)`
    background-color: var(--verde-primario) ;
    color: var(--branco-secundario);
    font-size: ${({ theme }) => theme.font.size};
    
    border: none;
    border-radius: 8px;
    width: 20rem;
    height: 7rem;
    font-size: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    transition: 0.3s;

        &:hover{
            filter: brightness(0.8);
            background-color: var(--verde-primario4);
        }
        &:focus {
            outline: none !important;
            box-shadow: none !important;
            filter: brightness(1.5);
            background-color: var(--verde-primario4);
        }
        &:active {
            outline: none !important;
            box-shadow: none !important;
            filter: brightness(1.5);
            background-color: var(--verde-primario4) !important;
        }
`;

