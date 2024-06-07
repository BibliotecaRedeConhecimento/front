import styled from "styled-components";

export const PageContentContainerStyle = styled.div`
    // p{
    //     text-align: left;
    // }

    //Siga esse estilo para passar props pra uma propriedade de estilo, deixe como undefined se você não quer passar nada.

    width: ${props => props.width || '100%'};
    height: ${props => props.height || 'undefined'};
    padding: ${props => props.padding || '1.5rem'};
    display: ${props => props.display || 'flex'};
    flex-direction: ${props => props.flexDirection || 'undefined'};
    justify-content: ${props => props.justifyContent || 'undefined'};
    align-items: ${props => props.alignItems || 'undefined'};
`;