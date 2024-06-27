import styled from "styled-components";

export const PageHeaderContainerStyle = styled.div`


    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--verde-primario);
    color: var(--branco-secundario);   
    height: 100px;
    
    span{
        font-size: ${({ theme, }) => theme.font.size};
        
    }

    svg{
        font-size: 48px;
    }
`;
