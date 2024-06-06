import './Global.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Slidebar from './components/SideBar';

function App() {
  

  return (
    <div className='App'>
    {/* Tudo que estiver fora de outlet, será persistido em todas as telas/rotas do projeto */}

    <Slidebar  />
    {/* Tudo dentro de Outlet, será considerado children, declarado na main.jsx, e será reutilizado as rotas com base nisso */}
      <Outlet />
      

    </div>
  )
}

export default App
