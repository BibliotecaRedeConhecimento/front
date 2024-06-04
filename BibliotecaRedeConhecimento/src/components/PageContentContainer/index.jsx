import {PageContentContainerStyle} from "./styles.jsx";

function PageContentContainer(props) {
    return(
        <PageContentContainerStyle>
            {props.children}
        </PageContentContainerStyle>
    );
}

export default PageContentContainer;
