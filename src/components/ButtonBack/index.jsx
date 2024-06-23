import React from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ButtonStyle } from "./styles.jsx";

function ButtonComponent({ size, bgColor, textColor, action, alternativeText, tabIndex = 0, children }) {
  const handleButtonClick = () => {
    window.history.back();
  };

  return (
    <ButtonStyle size={size} textColor={textColor} tabIndex={-1}>
      {/* Componente antigo, caso queira usar o antigo */}
      {/* <Button
        role="button"
        aria-label={alternativeText}
        title={alternativeText}
        className="botao-default"
        style={{ maxWidth: "100%" }}
        onClick={handleButtonClick}
        tabIndex={tabIndex}
      >
        {children}
      </Button> */}

      <IoMdArrowRoundBack
        tabIndex={tabIndex}
        aria-label={alternativeText}
        title={alternativeText}
        className="botao-default"
        style={{ cursor: "pointer", width: "100%", height: "2.2rem", fontSize: "2rem" }} 
        onClick={handleButtonClick}
      />
    </ButtonStyle>
  );
}

export default ButtonComponent;
