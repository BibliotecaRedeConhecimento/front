// import {PageContentContainerStyle} from "./styles.jsx";

// function PageContentContainer({props, width, children, display}) {
//     return(
//         <PageContentContainerStyle width={width} display={display}>
//             {children}
//         </PageContentContainerStyle>
//     );
// }

// export default PageContentContainer;

import {PageContentContainerStyle} from "./styles.jsx";

function PageContentContainer({width, padding, display, flexDirection, justifyContent, alignItems, children, height}) {
    return(
        <PageContentContainerStyle 
            width={width} 
            height={height} 
            padding={padding} 
            display={display} 
            flexDirection={flexDirection} 
            justifyContent={justifyContent} 
            alignItems={alignItems}
        >
            {children}
        </PageContentContainerStyle>
    );
}

export default PageContentContainer;
