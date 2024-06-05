import styled from "styled-components";
import '../../Global.css'
import '../../css/colors.css'

export const SearchStyle = styled.div`
         

    input{
        outline: none !important;        
        box-shadow: none !important;
        width: 100%;     
        padding: 8px;
        border-radius: 5px;    
        border: 1px solid #D9D9D9 !important;
        
        &:focus{           
            border-bottom: 2px solid var(--verde-primario) !important;
            border: 0px;
            border-radius: 5px;                           
        } 
    }

   
`;