import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import '../../Global.css'

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

const navigateTo = (path) => {
  navigate(path);
 };

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
          <Sidebar windowSize={windowSize} />
        <div className="col">
          <PageContainer>
            <PageHeaderContainer title='Bem-Vindo, Fulano!'/>
            <PageContentContainer>
              <h1>ESSA É A HOME</h1>
              <button onClick={() => navigateTo("/homeDomain")}>HomeDomain</button>
              <button onClick={() => navigateTo("/homeCategory")}>HomeCategory</button>
              <button onClick={() => navigateTo("/homeKnowledge")}>HomeKnowledge</button>
           </PageContentContainer>
          </PageContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;

