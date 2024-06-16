import { Route, Routes } from "react-router-dom";
import {CommonPrivateRoutes} from "../CommonRoutes/CommonPrivateRoutes";



export const AdministrativeDepartmentRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal,
}) => {
  return (
    <Routes >
            <CommonPrivateRoutes path="/administrativedepartment"

              element={
              
                <AdministrativeDepartmentPage
                  increaseFontSize={increaseFontSize}
                  decreaseFontSize={decreaseFontSize}
                  HandledarkMode={HandledarkMode}
                  isDarkMode={isDarkMode}
                  logOut={handleOpenModal}

                />
              }
            /> 

    </Routes>
  );
};
