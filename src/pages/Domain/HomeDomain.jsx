// Aqui vai conter os botões que levam para as pages: RegisterDomain e SearchDomain

import React from "react";
import {useNavigate} from "react-router-dom"

const HomeDomain = () => {

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    }

    return (
        <div>
            <h1>ESSE É A HOMEDOMAIN(domínio)</h1>
            <button onClick = {() => navigateTo('/registerDomain')}>
        RegisterDomain
      </button>
      <button onClick = {() => navigateTo('/searchDomain')}>
        SearchDomain
      </button>
        </div>
    );
};

export default HomeDomain;