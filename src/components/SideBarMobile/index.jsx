import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";

import { CgHome } from "react-icons/cg";
import { BsArrowBarLeft } from "react-icons/bs";
import { CgMenuRound } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import {
  MdContrast,
  MdOutlineExitToApp,
  MdOutlineTextDecrease,
  MdOutlineTextIncrease,
} from "react-icons/md";
import {
  SidebarMobileStyle,
  SidebarMobileNavStyle,
  LogoArea,
  CloseIconArea,
} from "./style.js";
import { SystemInfo } from "../../utils/SystemInfo.jsx";

function SidebarMobile({
  logOut,
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  function navigateTo(route) {
    setShow(false);
    window.scrollTo(0, 0);
    navigate(route);
  }

  const RenderSystemLogo = () => {
    return isDarkMode ? (
      <img
        src={SystemInfo.logoWhite}
        alt="T2M"
        style={{ cursor: "pointer" }}
        onClick={() => navigateTo("/")}
      />
    ) : (
      <img
        src={SystemInfo.logo}
        alt="T2M"
        style={{ cursor: "pointer" }}
        onClick={() => navigateTo("/")}
      />
    );
  };

  const SideBarMobileItem = ({ title, icon, action, value }) => {
    return (
      <div className="sidebar-nav-item">
        <div onClick={() => action(value)}>
          <div className="area-icons-label">
            {icon}
            <span>{title}</span>
          </div>
        </div>
      </div>
    );
  };

  const UserInfo = () => {
    return (
      <div className="user-container mt-3">
        <BiUserCircle />
        <div className="user-info">
          <span title="User" className="label-sidebar">
            Breno M.
          </span>
          <span
            id="user-department"
            className="label-sidebar"
            title="Departamento Pessoal"
          >
            Departamento pessoal
          </span>
        </div>
      </div>
    );
  };

  return (
    <SidebarMobileStyle>
      <Row>
        <Col className="px-0 col">
          <div className="button-show-area">
            <div className="button-show">
              <CgMenuRound onClick={handleShow} />
            </div>
            <div className="central-area">{RenderSystemLogo()}</div>
            <div className="right-area">
              <BiUserCircle />
            </div>
          </div>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header
              style={{ backgroundColor: "var(--branco-primario)" }}
            >
              <Offcanvas.Title>
                <LogoArea>
                  <div className="area-central">{RenderSystemLogo()}</div>
                  <span>{SystemInfo.title}</span>
                </LogoArea>
              </Offcanvas.Title>
              <CloseIconArea>
                <BsArrowBarLeft onClick={handleClose} />
              </CloseIconArea>
            </Offcanvas.Header>
            <Offcanvas.Body
              style={{ backgroundColor: "var(--branco-primario)" }}
            >
              <SidebarMobileNavStyle>
                <div className="flex-column sidebar-mobile-nav">
                  <SideBarMobileItem
                    title={"Alto Contraste"}
                    icon={<MdContrast title="Alto Contraste" size={28} />}
                    action={HandledarkMode}
                  />
                  <SideBarMobileItem
                    title={"Aumentar Fonte"}
                    icon={
                      <MdOutlineTextIncrease title="Aumentar Fonte" size={28} />
                    }
                    action={increaseFontSize}
                  />

                  <SideBarMobileItem
                    title={"Diminuir Fonte"}
                    icon={
                      <MdOutlineTextDecrease title="Diminuir Fonte" size={24} />
                    }
                    action={decreaseFontSize}
                  />
                </div>
                <div className="flex-column sidebar-mobile-nav">
                  <SideBarMobileItem
                    title={"Início"}
                    icon={<CgHome />}
                    action={navigateTo}
                    value={"/"}
                  />
                </div>

                <UserInfo />

                <div className="sidebar-mobile-nav">
                  <div className="sidebar-nav-item mt-3">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <MdOutlineExitToApp />
                        <span>Sair</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarMobileNavStyle>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </SidebarMobileStyle>
  );
}

export default SidebarMobile;
