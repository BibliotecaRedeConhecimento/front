import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";
import LogoT2m from "../../assets/logo_t2m.png";

import { BiBookOpen } from "react-icons/bi";
import { MdOutlineTextIncrease } from "react-icons/md";
import { MdOutlineTextDecrease } from "react-icons/md";
import { IoMdContrast } from "react-icons/io";
import { CgHome } from "react-icons/cg";
import { BsArrowBarLeft } from "react-icons/bs";
import { CgMenuRound } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineExitToApp } from "react-icons/md";
import {
  SidebarMobileStyle,
  SidebarMobileNavStyle,
  LogoArea,
  CloseIconArea,
} from "./styles.jsx";

function SidebarMobile({ logOut }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  function navigateTo(route) {
    setShow(false);
    window.scrollTo(0, 0);
    navigate(route);
  }

  return (
    <SidebarMobileStyle>
      <Row>
        <Col className="px-0 col">
          <div className="button-show-area">
            <div className="button-show">
              <CgMenuRound onClick={handleShow} />
            </div>
            <div className="central-area">
              <img src={LogoT2m} alt="Logo T2M" />
            </div>
            <div className="right-area">
              <BiUserCircle />
            </div>
          </div>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header>
              <Offcanvas.Title>
                <LogoArea>
                  <img src={LogoT2m} alt="Logo T2M" />
                  <span>Sistema de Biblioteca</span> 
                </LogoArea>
              </Offcanvas.Title>
              <CloseIconArea>
                <BsArrowBarLeft onClick={handleClose} />
              </CloseIconArea>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SidebarMobileNavStyle>
                <div className="flex-column sidebar-mobile-nav">
                  <div className="sidebar-nav-item">
                    <div onClick={() => navigateTo("/")}>
                      <div className="area-icons-label">
                        <CgHome />
                        <span>Início</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-column sidebar-mobile-nav">
                  <div className="sidebar-nav-item">
                    <div onClick={() => navigateTo("/")}>
                      <div className="area-icons-label">
                        <BiBookOpen />
                        <span>Conhecimento</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-container mt-3">
                  <BiUserCircle />
                  <div className="user-info">
                    <span title="Larissa Santos" className="label-sidebar">
                      Larissa S.
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
                <div className="sidebar-mobile-nav">
                  
                  <div className="sidebar-nav-item mt-3">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <MdOutlineTextIncrease />
                        <span>Aumentar</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-mobile-nav">
                  
                  <div className="sidebar-nav-item mt-3">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <MdOutlineTextDecrease />
                        <span>Diminuir</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-mobile-nav">
                  
                  <div className="sidebar-nav-item mt-3">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <IoMdContrast />
                        <span>Contraste</span>
                      </div>
                    </div>
                  </div>
                </div>

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