import './Global.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Slidebar from './components/SideBar';
import { useEffect, useState } from "react";


function App() {
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
    <div className='App'>
    {/* Tudo que estiver fora de outlet, será persistido em todas as telas/rotas do projeto */}

    <Slidebar windowSize={windowSize} />
    {/* Tudo dentro de Outlet, será considerado children, declarado na main.jsx, e será reutilizado as rotas com base nisso */}
      <Outlet />
      

    </div>
  )
}

export default App
