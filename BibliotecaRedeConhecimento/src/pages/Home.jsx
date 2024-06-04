// Aqui vai conter os botões que levam para as rotas: HomeDomain, HomeCategory e HomeKnowledge

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>ESSA É A HOME</h1>
      <button onClick={() => navigateTo("/homeDomain")}>HomeDomain</button>
      <button onClick={() => navigateTo("/homeCategory")}>HomeCategory</button>
      <button onClick={() => navigateTo("/homeKnowledge")}>
        HomeKnowledge
      </button>
    </div>
  );
};

export default Home;
