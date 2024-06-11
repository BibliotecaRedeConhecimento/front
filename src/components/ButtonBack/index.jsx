import { React } from "react";
import Button from "react-bootstrap/Button";

import { ButtonStyle } from "./styles.jsx";

function ButtonComponent({ size, bgColor, textColor, action, alternativeText, children }) {
  const handleButtonClick = () => {
    window.history.back();
  };
  return (
    <ButtonStyle size={size} bgColor={bgColor} textColor={textColor}>
      <Button
        role="button"
        aria-label={alternativeText}
        title={alternativeText}
        variant={bgColor}
        className="botao-default"
        style={{ maxWidth: "100%" }}
        onClick={handleButtonClick}
      >
        {children}
      </Button>
    </ButtonStyle>
  );
}

export default ButtonComponent;