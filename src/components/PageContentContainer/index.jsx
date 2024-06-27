import { React } from "react";
import {PageContentContainerStyle} from "./style";

function PageContentContainer({width, padding, display, flexDirection, justifyContent, alignItems, children, height, scrollable}) {
    return(
        <PageContentContainerStyle 
            width={width} 
            height={height} 
            padding={padding} 
            display={display} 
            flexDirection={flexDirection} 
            justifyContent={justifyContent} 
            alignItems={alignItems}
            scrollable={scrollable}
        >
            {children}
        </PageContentContainerStyle>
    );
}

export default PageContentContainer;
