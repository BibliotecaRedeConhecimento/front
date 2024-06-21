import React from "react";
import {ThemeProvider} from "styled-components";
import GlobalStyle from "./style/GlobalStyle.js";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import VLibras from "@djpfs/react-vlibras/";
import {useState} from "react";
import Root from "./routes/root";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import useFontSize from "./utils/hooks/useFontSize";
import {darkTheme, lightTheme} from "./utils/Themes";
import {AuthenticationProvider} from "./services/context/AuthContext.jsx";
import {ReviewContext, ReviewProvider} from "./services/context/ReviewContext";

function App() {
    const savedDarkMode = localStorage.getItem("darkMode");
    const [darkMode, setDarkMode] = useState(savedDarkMode === "true");
    const {size, increaseFontSize, decreaseFontSize} = useFontSize();

    const HandledarkMode = () => {
        setDarkMode(!darkMode);
    };

    const theme = {
        ...(darkMode ? darkTheme : lightTheme),
        font: {
            size: `${size}px`,
        },
    };

    return (
        <AuthenticationProvider>
            <ThemeProvider theme={theme}>
                <ReviewProvider>
                    <GlobalStyle/>

                    <Root
                        increaseFontSize={increaseFontSize}
                        decreaseFontSize={decreaseFontSize}
                        HandledarkMode={HandledarkMode}
                        isDarkMode={darkMode}
                    />

                    <VLibras forceOnload={true}/>

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </ReviewProvider>
            </ThemeProvider>
        </AuthenticationProvider>
    );
}

export default App;
