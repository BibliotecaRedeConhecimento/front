import { Route, Routes } from "react-router-dom"
import TelaInicial from "../../pages/TelaInicial"
import TelaBiblioteca from "../../pages/TelaBiblioteca"
import HomeDomain from "../../pages/HomeDomain"
import HomeCategory from "../../pages/HomeCategory"
import HomeKnowledge from "../../pages/HomeKnowledge"
import SearchCategory from "../../pages/SearchCategory"
import RegisterCategory from "../../pages/RegisterCategory"
import RegisterDomain from "../../pages/RegisterDomain"
import SearchDomain from "../../pages/SearchDomain"
import RegisterKnowledge from "../../pages/RegisterKnowledge"
import SearchKnowledge from "../../pages/SearchKnowledge"
import InativeCategory from "../../pages/InativeCategory"
import InativeKnowledge from "../../pages/InativeKnowledge"
import InativeDomain from "../../pages/InativeDomain"
import ChangeCategory from "../../pages/ChangeCategory"
import ChangeDomain from "../../pages/ChangeDomain"
import ChangeKnowledge from "../../pages/ChangeKnowledge"



export const CommonPrivateRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TelaInicial
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/biblioteca"
        element={
          <TelaBiblioteca
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/menuDominio"
        element={
          <HomeDomain
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/menuCategoria"
        element={
          <HomeCategory
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/menuConhecimento"
        element={
          <HomeKnowledge
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarCategoria"
        element={
          <RegisterCategory
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarCategoria"
        element={
          <SearchCategory
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
       <Route
        path="/categoriaInativa"
        element={
          <InativeCategory
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarCategoria/alterarCategoria/:id"
        element={
          <ChangeCategory
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarDominio"
        element={
          <RegisterDomain
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarDominio"
        element={
          <SearchDomain
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
       <Route
        path="/dominioInativo"
        element={
          <InativeDomain
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarDominio/alterarDominio/:id"
        element={
          <ChangeDomain
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarConhecimento"
        element={
          <RegisterKnowledge
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      /> 
      <Route
        path="/buscarConhecimento"
        element={
          <SearchKnowledge
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      /> 
        <Route
        path="/conhecimentoInativo"
        element={
          <InativeKnowledge
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarConhecimento/alterarConhecimento/:id"
        element={
          <ChangeKnowledge
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
    </Routes>
    
  )
}