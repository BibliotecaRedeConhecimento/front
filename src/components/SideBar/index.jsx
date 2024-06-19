import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { MdOutlineExitToApp } from "react-icons/md";
import { MdContrast, MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";
import { BiUserCircle, BiCategoryAlt } from "react-icons/bi";
import { IoLibraryOutline } from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SidebarStyle } from "./style.js";
import { SideBarItem } from "../SideBarItem/index.jsx";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { SystemInfo } from "../../utils/SystemInfo.jsx";

function Sidebar({
  logOut,
  windowSize,
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const [sideBarCollapse, setSideBarCollapse] = useState(true);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthenticationContext);

  const navigateTo = useCallback((route) => {
    setSideBarCollapse(true);
    window.scrollTo(0, 0);
    navigate(route);
  }, [navigate]);

  const handleSidebarCollapse = () => {
    setSideBarCollapse(!sideBarCollapse);
  };

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

  const UserInfo = () => {
    return (
      <div className="user-container">
        {sideBarCollapse ? (
          <SideBarItem
            index={9}
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

  useEffect(() => {
    const commonItems = [
      {
        index: 1,
        smallText: "Contraste",
        bigText: "Alto Contraste",
        action: HandledarkMode,
        icon: <MdContrast title="Alto Contraste" size={24} />,
      },
      {
        index: 2,
        smallText: "Aumentar",
        bigText: "Aumentar Fonte",
        action: increaseFontSize,
        icon: <MdOutlineTextIncrease title="Aumentar Fonte" size={24} />,
      },
      {
        index: 3,
        smallText: "Diminuir",
        bigText: "Diminuir Fonte",
        action: decreaseFontSize,
        icon: <MdOutlineTextDecrease title="Diminuir Fonte" size={24} />,
      },
      {
        index: 4,
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
        index: 5,
        smallText: "Início",
        bigText: "Início",
        action: navigateTo,
        value: "/",
        icon: <CgHome title="Início" />,
      },
    ];

    const specialRoutes = [
      '/biblioteca',
      '/menuDominio',
      '/menuCategoria',
      '/menuConhecimento',
      '/cadastrarCategoria',
      '/buscarCategoria',
      '/categoriaInativa',
      '/buscarCategoria/ChangeCategory/',
      '/cadastrarDominio',
      '/buscarDominio',
      '/dominioInativo',
      '/buscarDominio/ChangeDomain/',
      '/cadastrarConhecimento',
      '/buscarConhecimento',
      '/conhecimentoInativo',
      '/buscarConhecimento/changeKnowledge/',
    ];

    if (specialRoutes.some(route => location.pathname.startsWith(route))) {
      setItems([
        ...commonItems,
        {
          index: 6,
          smallText: "Domínio",
          bigText: "Domínio",
          action: navigateTo,
          value: "/menuDominio",
          icon: <IoLibraryOutline title="Domínio" size={24} />,
        },
        {
          index: 7,
          smallText: "Categoria",
          bigText: "Categoria",
          action: navigateTo,
          value: "/menuCategoria",
          icon: <BiCategoryAlt title="Categoria" size={24} />,
        },
        {
          index: 8,
          smallText: "Conhecimento",
          bigText: "Conhecimento",
          action: navigateTo,
          value: "/menuConhecimento",
          icon: <SlBookOpen title="Conhecimento" size={24} />,
        },
      ]);

      SystemInfo.abbreviation = "SB";
    } else {
      setItems(commonItems);
      SystemInfo.abbreviation = "SGC";
    }
  }, [location.pathname, sideBarCollapse, HandledarkMode, increaseFontSize, decreaseFontSize, navigateTo]);

  return (
    <Col className={windowSize >= 992 ? "px-0 col-1" : "px-0 col-0"}>
      <SidebarStyle collapse={sideBarCollapse}>
        <Row>
          <Col className="column-container">
            <SystemLogo />
            <div className="sidebar-nav">
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
            <UserInfo />
            <div className="sidebar-nav">
              <SideBarItem
                index={10}
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
