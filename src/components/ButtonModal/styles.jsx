import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const ButtonModalStyle = styled(Button)`
    background-color: #013D32;
    color: white;
    border: none;
    border-radius: 4px;
    width: 21rem;
    height: 5rem;
    font-size: auto;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    justify-content: flex-end;
    &:hover {
        background-color: #0F6E58;
    }
`;