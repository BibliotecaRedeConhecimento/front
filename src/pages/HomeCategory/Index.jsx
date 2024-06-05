// Aqui vai conter os botões que levam para as pages: RegisterCategory e SearchCategory

import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCategory = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div>
      <h1>ESSA É A HOMECATEGORY(categoria)</h1>
      <button onClick={() => navigateTo("/registerCategory")}>
        RegisterCategory
      </button>
      <button onClick={() => navigateTo("/searchCategory")}>
        SearchCategory
      </button>
    </div>
  );
};

export default HomeCategory;
