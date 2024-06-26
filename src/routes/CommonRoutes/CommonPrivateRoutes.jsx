import {Route, Routes} from "react-router-dom"
import TelaInicial from "../../pages/TelaInicial"
import TelaBiblioteca from "../../pages/TelaBiblioteca"
import HomeDomain from "../../pages/HomeDomain/Index"
import HomeCategory from "../../pages/HomeCategory/Index"
import HomeKnowledge from "../../pages/HomeKnowledge/Index"
import SearchCategory from "../../pages/SearchCategory/Index"
import RegisterCategory from "../../pages/RegisterCategory/Index"
import RegisterDomain from "../../pages/RegisterDomain/Index"
import SearchDomain from "../../pages/SearchDomain/Index"
import RegisterKnowledge from "../../pages/RegisterKnowledge/Index"
import SearchKnowledge from "../../pages/SearchKnowledge/Index"
import InativeCategory from "../../pages/InativeCategory"
import InativeKnowledge from "../../pages/InativeKnowledge"
import InativeDomain from "../../pages/InativeDomain"
import ChangeCategory from "../../pages/ChangeCategory"
import ChangeDomain from "../../pages/ChangeDomain"
import ChangeKnowledge from "../../pages/ChangeKnowledge"
import ViewKnowledge from "../../pages/ViewKnowledge"
import ReviewKnowledge from "../../pages/ReviewKnowledge";


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
                path="/buscarCategoria/ChangeCategory/:id"
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
                path="/buscarDominio/ChangeDomain/:id"
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
                path="/revisarConhecimento"
                element={
                    <ReviewKnowledge
                        increaseFontSize={increaseFontSize}
                        decreaseFontSize={decreaseFontSize}
                        HandledarkMode={HandledarkMode}
                        isDarkMode={isDarkMode}
                        logOut={handleOpenModal}
                    />
                }
            />
            <Route
                path="/buscarConhecimento/changeKnowledge/:id"
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
            <Route
                path="/viewKnowledge/:id"
                element={
                    <ViewKnowledge
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