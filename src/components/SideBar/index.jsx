import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { MdOutlineExitToApp } from "react-icons/md";
import { MdContrast, MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SidebarStyle } from "./style.js";
import { SideBarItem } from "../SideBarItem/index.jsx";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { SystemInfo } from "../../utils/SystemInfo.jsx";
import { BiCategoryAlt } from "react-icons/bi";
import { IoLibraryOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";

function Sidebar({
  logOut,
  windowSize,
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const [sideBarCollapse, setSideBarCollapse] = useState(true); // Estado para controlar se a barra lateral está recolhida ou expandida
  const [items, setItems] = useState([]); // Estado para armazenar os itens da barra lateral dinamicamente
  const navigate = useNavigate(); // Hook do React Router para navegação programática
  const location = useLocation(); // Hook do React Router para obter a localização atual da rota
  const { user } = useContext(AuthenticationContext); // Contexto de autenticação para obter informações do usuário logado

  // Função para navegar para uma rota específica e recolher a barra lateral
  function navigateTo(route) {
    setSideBarCollapse(true); // Recolhe a barra lateral ao navegar
    window.scrollTo(0, 0); // Faz scroll para o topo da página
    navigate(route); // Navega para a rota especificada
  }

  // Função para alternar entre recolher e expandir a barra lateral
  const handleSidebarCollapse = () => {
    setSideBarCollapse(!sideBarCollapse); // Alterna o estado de recolher/expandir da barra lateral
  };

  // Função para exibir o nome do papel do usuário com base no seu papel
  const showRoleName = (role) => {
    switch (role) {
      case "COLLABORATOR":
        return "Colaborador";
      case "ADMINISTRATIVE_DEPARTMENT":
        return "Departamento Administrativo";
      case "SYSTEM_ADMINISTRATOR":
        return "Administrador do Sistema";
      case "MANAGER":
        return "Gestor";
      default:
        return "";
    }
  };

  // Componente para exibir o logo do sistema
  const SystemLogo = () => {
  
    return (
      <div className="logo-area">
        {isDarkMode ? (
          <img
            src={SystemInfo.logoWhite}
            alt="T2M"
            onClick={() => navigateTo("/")}
          />
        ) : (
          <img
            src={SystemInfo.logo}
            alt="T2M"
            onClick={() => navigateTo("/")}
          />
        )}
        {sideBarCollapse ? (
          <div className="system-title">
            <strong>{SystemInfo.abbreviation}</strong>
          </div>
        ) : (
          <div className="system-title">{SystemInfo.title}</div>
        )}
      </div>
    );
  };

  // Componente para exibir as informações do usuário na barra lateral
  const UserInfo = () => {
    return (
      <div className="user-container">
        {sideBarCollapse ? (
          <SideBarItem
            index={8}
            smallText={"Perfil"}
            bigText={"Perfil"}
            action={navigateTo}
            value={"/"}
            icon={<BiUserCircle title="Perfil" />}
            sideBarCollapse={sideBarCollapse}
          />
        ) : (
          <>
            <BiUserCircle className="user-icon" size={28} title="Perfil" />
            <div className="user-info">
              {sideBarCollapse ? (
                ""
              ) : (
                <span title="Usuário" className="label-sidebar">
                  {user.fullName}
                </span>
              )}
              {sideBarCollapse ? (
                ""
              ) : (
                <span
                  id="user-department"
                  className="label-sidebar"
                  title="Departamento Pessoal"
                >
                  {showRoleName(user.role)}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  // Efeito para atualizar dinamicamente os itens da barra lateral com base na rota atual
  useEffect(() => {
    // Itens comuns que estão sempre presentes na barra lateral
    const commonItems = [
      {
        index: 0,
        smallText: "Contraste",
        bigText: "Alto Contraste",
        action: HandledarkMode,
        icon: <MdContrast title="Alto Contraste" size={24} />,
      },
      {
        index: 1,
        smallText: "Aumentar",
        bigText: "Aumentar Fonte",
        action: increaseFontSize,
        icon: <MdOutlineTextIncrease title="Aumentar Fonte" size={24} />,
      },
      {
        index: 2,
        smallText: "Diminuir",
        bigText: "Diminuir Fonte",
        action: decreaseFontSize,
        icon: <MdOutlineTextDecrease title="Diminuir Fonte" size={24} />,
      },
      {
        index: 3,
        smallText: sideBarCollapse ? "Expandir" : "Retrair",
        bigText: sideBarCollapse ? "Expandir" : "Retrair",
        action: handleSidebarCollapse,
        icon: sideBarCollapse ? (
          <BsArrowBarRight title="Expandir" size={24} />
        ) : (
          <BsArrowBarLeft title="Retrair" size={24} />
        ),
      },
      {
        index: 4,
        smallText: "Início",
        bigText: "Início",
        action: navigateTo,
        value: "/",
        icon: <CgHome title="Início" />,
      },
    ];

    // Verifica se a rota atual é '/about' para adicionar itens extras na barra lateral
    if (location.pathname === '/biblioteca' || location.pathname === '/menuDominio' || location.pathname === '/menuCategoria' || location.pathname === '/menuConhecimento' || location.pathname === '/cadastrarCategoria' || location.pathname === '/buscarCategoria' || location.pathname === '/categoriaInativa' || location.pathname === '/buscarCategoria/alterarCategoria/:id' || location.pathname === '/cadastrarDominio' || location.pathname === '/buscarDominio' || location.pathname === '/dominioInativo' || location.pathname === '/buscarDominio/alterarDominio/:id' || location.pathname === '/cadastrarConhecimento' || location.pathname === '/buscarConhecimento' || location.pathname === '/conhecimentoInativo' || location.pathname === '/buscarConhecimento/alterarConhecimento/:id') {
      setItems([
        ...commonItems,
        {
          index: 5,
          smallText: "Domínio",
          bigText: "Domínio",
          action: navigateTo,
          value: "/menuDominio",
          icon: <IoLibraryOutline title="Domínio" size={24} />,
        },
        {
          index: 6,
          smallText: "Categoria",
          bigText: "Categoria",
          action: navigateTo,
          value: "/menuCategoria",
          icon: <BiCategoryAlt title="Categoria" size={24} />,
        },
        {
          index: 7,
          smallText: "Conhecimento",
          bigText: "Conhecimento",
          action: navigateTo,
          value: "/menuConhecimento",
          icon: <SlBookOpen title="Conhecimento" size={24} />,
        },
      ]);
    } else {
      setItems(commonItems); // Define os itens comuns se não estiver na rota '/about'
    }
  }, [location, sideBarCollapse, HandledarkMode, increaseFontSize, decreaseFontSize, navigateTo]);

  // Renderiza o componente da barra lateral com base no estado de recolhimento/expandir
  return (
    <Col className={windowSize >= 992 ? "px-0 col-1" : "px-0 col-0"}>
      <SidebarStyle collapse={sideBarCollapse}>
        <Row>
          <Col className="column-container">
            <SystemLogo /> {/* Renderiza o logo do sistema */}
            <div className="sidebar-nav">
              {/* Mapeia e renderiza cada item na barra lateral */}
              {items.map((item, index) => (
                <SideBarItem
                  key={index}
                  index={item.index}
                  smallText={item.smallText}
                  bigText={item.bigText}
                  action={item.action}
                  value={item.value}
                  icon={item.icon}
                  sideBarCollapse={sideBarCollapse}
                />
              ))}
            </div>
            <UserInfo /> {/* Renderiza as informações do usuário na barra lateral */}
            <div className="sidebar-nav">
              {/* Renderiza o item de sair da aplicação na barra lateral */}
              <SideBarItem
                index={8}
                smallText={"Sair"}
                bigText={"Sair"}
                action={logOut}
                icon={<MdOutlineExitToApp title="Sair" />}
                sideBarCollapse={sideBarCollapse}
              />
            </div>
          </Col>
        </Row>
      </SidebarStyle>
    </Col>
  );
}

export default Sidebar;
