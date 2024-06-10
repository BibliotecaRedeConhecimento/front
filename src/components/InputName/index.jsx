import React from 'react';
import './styles.css';

const InputName = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="input-nome"
      placeholder="Digite seu nome"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputName;
