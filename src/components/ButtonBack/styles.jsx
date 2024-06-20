import styled from "styled-components";

export const ButtonStyle = styled.div`
    .botao-default {
        width: ${props => props.size} !important;
        background-color: ${props => props.bgColor} !important;
        color: ${props => props.textColor} !important;        
        border: none !important;
        transition: 0.3s;

        &:hover {
            filter: brightness(0.8);
        }
        &:focus {
            outline: none !important;
            box-shadow: none !important;
            filter: brightness(1.5);
            background-color: var(--verde-primario4);
        }
    }

    @media (max-width: 800px) {
        .botao-default {
            font-size: 1.5rem;
            height:     .5rem;
        }
    }
`;