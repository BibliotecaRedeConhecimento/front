//import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonStyle } from './styles';


const ButtonConfirmRegistration = ({size, bgColor, textColor, action, alternativeText, children}) => {
  return (
    <ButtonStyle size={size} bgColor={bgColor} textColor={textColor}>
    <Button
      role="button"
      aria-label={alternativeText}
      title={alternativeText}
      variant={bgColor}
      className="botao-confirm"
      style={{ maxWidth: "100%" }}
      onClick={action}
      type="submit"
    >
      {children}
    </Button>
  </ButtonStyle>
  );
};

export default ButtonConfirmRegistration;
