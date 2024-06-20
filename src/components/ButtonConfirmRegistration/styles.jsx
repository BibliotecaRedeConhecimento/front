import styled from "styled-components";

export const ButtonStyle = styled.div`
    .botao-confirm{
        width:${props => props.size} !important;
        background-color: ${props => props.bgColor} !important;
        color: var(--branco-secundario) !important;      
        border: none !important;
        transition: 0.3s;

        &:hover{
            filter: brightness(0.8);
        }
        &:focus {
            outline: none !important;
            box-shadow: none !important;
            filter: brightness(0.8);
            background-color: var(--verde-primario4);
        }
    }
`;