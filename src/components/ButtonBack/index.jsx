import { React } from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ButtonStyle } from "./styles.jsx";

function ButtonComponent({ size, bgColor, textColor, action, alternativeText, children }) {
  const handleButtonClick = () => {
    window.history.back();
  };
  return (
    <ButtonStyle size={size}  textColor={textColor} >
      
      {/* botão antigo caso for usar o antigo */}
      {/* <Button
        role="button"
        aria-label={alternativeText}
        title={alternativeText}
        className="botao-default"
        style={{ maxWidth: "100%" }}
        onClick={handleButtonClick}
      >
        {children}
      </Button> */}

<IoMdArrowRoundBack
        aria-label={alternativeText}
        title={alternativeText}
        className="botao-default"
        style={{  cursor: "pointer", width: "100%", height: "3.5rem", fontSize: "2rem"}} 
        onClick={handleButtonClick}
      />
    </ButtonStyle>
  );
}

export default ButtonComponent;