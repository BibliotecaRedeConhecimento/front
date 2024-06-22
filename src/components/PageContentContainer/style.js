import styled from "styled-components";

export const PageContentContainerStyle = styled.div`
    // p{
    //     text-align: left;
    // }

    //Siga esse estilo para passar props pra uma propriedade de estilo, deixe como undefined se você não quer passar nada.

    width: ${props => props.width || '100%'};
    height: ${props => props.height || '86.1vh'};
    padding-top: ${props => props.padding || '5%'};
    padding-bottom: ${props => props.padding || '5%'};
    padding-right: ${props => props.padding || '10%'};
    padding-left: ${props => props.padding || '10%'};
    display: ${props => props.display || 'flex-column'};
    flex-direction: ${props => props.flexDirection || 'undefined'};
    justify-content: ${props => props.justifyContent || 'undefined'};
    align-items: ${props => props.alignItems || 'undefined'};
    overflow-y: ${props => props.scrollable ? 'auto' : 'hidden'};
    //min-height: 100vh; 
`;
