import styled from "styled-components";

export const PageHeaderContainerStyle = styled.div`
     

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--verde-primario);
    color: var(--branco-primario);  
     
    height: 100px;
    
    span{
        font-size: 2rem;        
    }

    svg{
        font-size: 48px;
    }
`;