import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './pages/Home.jsx'
import HomeCategory from './pages/Category/HomeCategory.jsx'
import HomeDomain from './pages/Domain/HomeDomain.jsx'
import HomeKnowledge from './pages/Knowledge/HomeKnowledge.jsx'
import RegisterCategory from './pages/Category/RegisterCategory.jsx'
import SearchCategory from './pages/Category/SearchCategory.jsx'
import RegisterDomain from './pages/Domain/RegisterDomain.jsx'
import SearchDomain from './pages/Domain/SearchCategory.jsx'
import RegisterKnowledge from './pages/Knowledge/RegisterKnowledge.jsx'
import SearchKnowledge from './pages/Knowledge/SearchKnowledge.jsx'


//A cost router vai servir pra puxar as pages que precisamos utilizar e definir uma rota pra elas
const router = createBrowserRouter ([
  {
  path: "/",
  element: <Home></Home>
  },
  {
    path: "homeCategory",
    element: <HomeCategory></HomeCategory>
  },
  {
    path: "homeDomain",
    element: <HomeDomain></HomeDomain>
  },
  {
    path: "homeKnowledge",
    element: <HomeKnowledge></HomeKnowledge>
  },
  {
    path: "registerCategory",
    element: <RegisterCategory></RegisterCategory>
    
  },
  {
      path: "searchCategory",
      element: <SearchCategory></SearchCategory>
      
  },
  {
    path: "registerDomain",
    element: <RegisterDomain></RegisterDomain>

  },
  {
    path: "searchDomain",
    element: <SearchDomain></SearchDomain>

  },
  {
    path: "registerKnowledge",
    element: <RegisterKnowledge></RegisterKnowledge>

  },
  {
    path: "searchKnowledge",
    element: <SearchKnowledge></SearchKnowledge>

  },
  


  ])

//As rotas são feitas através da cost router, chamada como props na routerProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
