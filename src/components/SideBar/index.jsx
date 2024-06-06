import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoT2m from "../../assets/logo_t2m.png";

import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { MdOutlineExitToApp } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { BiBookOpen } from "react-icons/bi";
import { MdOutlineTextIncrease } from "react-icons/md";
import { MdOutlineTextDecrease } from "react-icons/md";
import { IoMdContrast } from "react-icons/io";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { SidebarStyle } from "./styles.jsx";
import SidebarMobile from "../SideBarMobile/index.jsx";
import { FontSizeContext } from "../../Context/FontSizeProvider.jsx";

function Sidebar({ logOut, windowSize }) {
  const [sideBarCollapse, setSideBarCollapse] = useState(true);
  const { increaseFontSize, decreaseFontSize } = useContext(FontSizeContext);
  
  const navigate = useNavigate();

  function navigateTo(route) {
    setSideBarCollapse(true);
    window.scrollTo(0, 0);
    navigate(route);
  }

  const isMobile = windowSize <= 768;


  return (
    <div>
      {isMobile ? (
        <SidebarMobile />
      ) : (
        <Col className={windowSize >= 992 ? "px-0 col-1" : "px-0 col-0"}>
          <SidebarStyle collapse={sideBarCollapse}>
            <Row>
              <Col className="column-container">
                <div className="logo-area">
                  <img src={LogoT2m} alt="Logo T2M" />
                  {sideBarCollapse ? <span>SB</span> : <span>Sistema de Biblioteca</span>}
                </div>
                <div className="sidebar-nav">
                  <div className="mt-2 sidebar-nav-item">
                    {sideBarCollapse ? (
                      <div className="area-icons-label">
                      <BsArrowBarRight title="Expandir"
                        onClick={() => setSideBarCollapse(!sideBarCollapse)}
                      />
                      </div>
                    ) : (
                      <div className="area-icons-label">
                      <BsArrowBarLeft title="Retrair"
                        onClick={() => setSideBarCollapse(!sideBarCollapse)}
                      />
                      <span className="label-sidebar">Retrair</span>
                      </div>
                    )}
                    </div>

                  <div className="mt-2 sidebar-nav-item">
                    <div onClick={() => navigateTo("/")}>
                      <div className="area-icons-label">
                        <CgHome title="Início" />
                        {sideBarCollapse ? (
                          ""
                        ) : (
                          <span className="label-sidebar">Início</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-nav-item">
                    <div onClick={() => navigateTo("/tabela")}>
                      <div className="area-icons-label">
                        <BiBookOpen title="Conhecimento" />
                        {sideBarCollapse ? (
                          ""
                        ) : (
                          <span className="label-sidebar">Conhecimento</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-container">
                  <BiUserCircle title="Larissa S." />
                  <div className="user-info">
                    {sideBarCollapse ? (
                      ""
                    ) : (
                      <span title="Larissa Santos" className="label-sidebar">
                        Larissa S.
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
                        Departamento pessoal
                      </span>
                    )}
                  </div>
                </div>
                <div className="sidebar-nav">
                <div className="sidebar-nav-item">
                    <div onClick={increaseFontSize}>
                      <div className="area-icons-label">
                        <MdOutlineTextIncrease title="Aumentar" />
                        {sideBarCollapse ? (
                          ""
                        ) : (
                          <span className="label-sidebar">Aumentar</span>
                        )}{" "}
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-nav-item">
                    <div onClick={decreaseFontSize}>
                      <div className="area-icons-label">
                        <MdOutlineTextDecrease title="Diminuir" />
                        {sideBarCollapse ? (
                          ""
                        ) : (
                          <span className="label-sidebar">Diminuir</span>
                        )}{" "}
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-nav-item">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <IoMdContrast title="Contraste" />
                        {sideBarCollapse ? (
                          ""
                        ) : (
                          <span className="label-sidebar">Contraste</span>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-nav-item">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <MdOutlineExitToApp title="Sair" />
                        {sideBarCollapse ? (
                          ""
                        ) : (
                          <span className="label-sidebar">Sair</span>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </SidebarStyle>
        </Col>
      )}
    </div>
  );
}

export default Sidebar;