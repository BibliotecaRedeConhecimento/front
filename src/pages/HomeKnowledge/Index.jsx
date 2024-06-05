// Aqui vai conter os botões que levam para as pages: RegisterKnowledge e SearchKnowledge

import React from "react";
import { useNavigate } from "react-router-dom";

const HomeKnowledge = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>ESSA É O HOMEKNOWLEDGE(conhecimento)</h1>
      <button onClick={() => navigateTo("/registerKnowledge")}>
        RegisterKnowledge
      </button>
      <button onClick={() => navigateTo("/searchKnowledge")}>
        SearchKnowledge
      </button>
    </div>
  );
};

export default HomeKnowledge;
