import { React } from "react";
import Button from "react-bootstrap/Button";

import { ButtonStyle } from "./style";

function ButtonInative({ size, height, bgColor, textColor, action, alternativeText, children }) {
  return (
    <ButtonStyle size={size} height={height} bgColor='var(--verde-primario)' textColor='--branco-secundario'>
      <Button
        role="button"
        aria-label={alternativeText}
        title={alternativeText}
        className="botao-default"
        style={{ maxWidth: "100%" }}
        onClick={action}
      >
        {children}
      </Button>
    </ButtonStyle>
  );
}

export default ButtonInative;
