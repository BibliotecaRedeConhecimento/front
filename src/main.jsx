import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Index.jsx';
import HomeCategory from './pages/HomeCategory/Index.jsx';
import HomeDomain from './pages/HomeDomain/Index.jsx';
import HomeKnowledge from './pages/HomeKnowledge/Index.jsx';
import RegisterCategory from './pages/RegisterCategory/Index.jsx';
import SearchCategory from './pages/SearchCategory/Index.jsx';
import RegisterDomain from './pages/RegisterDomain/Index.jsx';
import SearchDomain from './pages/SearchDomain/Index.jsx';
import RegisterKnowledge from './pages/RegisterKnowledge/Index.jsx';
import SearchKnowledge from './pages/SearchKnowledge/Index.jsx';

// O router vai servir para puxar as pages que precisamos utilizar e definir uma rota para elas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'homeCategory',
    element: <HomeCategory />,
  },
  {
    path: 'homeDomain',
    element: <HomeDomain />,
  },
  {
    path: 'homeKnowledge',
    element: <HomeKnowledge />,
  },
  {
    path: 'registerCategory',
    element: <RegisterCategory />,
  },
  {
    path: 'searchCategory',
    element: <SearchCategory />,
  },
  {
    path: 'registerDomain',
    element: <RegisterDomain />,
  },
  {
    path: 'searchDomain',
    element: <SearchDomain />,
  },
  {
    path: 'registerKnowledge',
    element: <RegisterKnowledge />,
  },
  {
    path: 'searchKnowledge',
    element: <SearchKnowledge />,
  },
]);

// As rotas são feitas através do router, chamado como props no RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
