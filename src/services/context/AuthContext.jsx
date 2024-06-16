import {jwtDecode} from "jwt-decode";
import React, {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api} from "../api/ApiConnection";
import {LoginService} from "../api/ApiLogin";

export const AuthenticationContext = createContext({});

export const ROLE_COLLABORATOR = 0
export const ROLE_ADMINISTRATIVE_DEPARTMENT = 1
export const ROLE_SYSTEM_ADMINISTRATOR = 2
export const ROLE_MANAGER = 3

export const AuthenticationProvider = ({children}) => {
    const [user, setUser] = useState({
        id: "",
        fullName: "",
        personalEmail: "",
        corporativeEmail: "",
        phone: "",
        cpf: "",
        role: 3,
        birthDate: "",
        admissionDate: "",
        token: "",
    });
    const [token, setToken] = useState("");
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, []);

    const login = async (email, password) => {
        const respostaServiceLogin = await LoginService(email, password);
        if (!respostaServiceLogin) return false;
        setUser({
            id: respostaServiceLogin?.Id,
            fullName: respostaServiceLogin?.FullName,
            personalEmail: respostaServiceLogin?.PersonalEmail,
            corporativeEmail: respostaServiceLogin?.CorporativeEmail,
            phone: respostaServiceLogin?.Phone,
            cpf: respostaServiceLogin?.Cpf,
            role: respostaServiceLogin?.Role,
            birthDate: respostaServiceLogin?.BirthDate,
            admissionDate: respostaServiceLogin?.AdmissionDate,
            token: respostaServiceLogin?.token,
        });
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: respostaServiceLogin?.Id,
                fullName: respostaServiceLogin?.FullName,
                personalEmail: respostaServiceLogin?.PersonalEmail,
                corporativeEmail: respostaServiceLogin?.CorporativeEmail,
                phone: respostaServiceLogin?.Phone,
                cpf: respostaServiceLogin?.Cpf,
                role: respostaServiceLogin?.Role,
                birthDate: respostaServiceLogin?.BirthDate,
                admissionDate: respostaServiceLogin?.AdmissionDate,
                token: respostaServiceLogin?.token,
            })
        );
        setToken(respostaServiceLogin?.token);
        localStorage.setItem("token", respostaServiceLogin?.token);

        return true;
    };

    const logOut = () => {
        setToken("");
        setAuth(false);
        localStorage.clear();
    };

    const isAuthenticated = () => {
        var tokenLocal = localStorage.getItem("token");
        if (!tokenLocal) {
            logOut();
            return false
        }

        var tokenDecoded = jwtDecode(tokenLocal);

        api.defaults.headers["Authorization"] = `Bearer ${tokenLocal}`;

        // TODO setar informações do usuario ao receber a resposta do endpoint
        api.get(`User/${tokenDecoded.Id}`).then((res) => {
                const {
                    id,
                    fullName,
                    personalEmail,
                    corporativeEmail,
                    phone,
                    cpf,
                    role,
                    birthDate,
                    admissionDate,
                    token
                } = res.data;

                setUser({
                    id: id,
                    fullName: fullName,
                    personalEmail: personalEmail,
                    corporativeEmail: corporativeEmail,
                    phone: phone,
                    cpf: cpf,
                    role: role,
                    birthDate: birthDate,
                    admissionDate: admissionDate,
                    token: token
                });
            }
        ).catch(error => {
            logOut()
            if (error.message === "Network Error") {
                toast.error(
                    "Erro ao realizar o login - Erro de conexão, o servidor pode estar fora do ar."
                );
            } else {
                toast.error("Erro de autenticação.");
            }
            console.log(error);
            return false
        })

        setAuth(true);
        return true
    };

    const isManager = () => {
        return true;
        if (!isAuthenticated()) {
            logOut()
            return false;
        }
        return user.role === 3
    }

    return (
        <AuthenticationContext.Provider
            value={{
                login,
                logOut,
                user,
                isAuthenticated,
                auth,
                token,
                isManager
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
