import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../components/Dashboard/DashboardPage";
import { HomePage } from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import SurveyPage from "../pages/Survey/SurveyPage";
import { SurveyModulePage } from "../pages/SurveyModule/SurveyModulePage";
import { UserPage } from "../pages/Users/UserPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { UserSurveySummary } from "../pages/userSurveySummary/userSurveySummaryPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SurveyPage" element={<SurveyPage />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="gestionUsuarios" element={<UserPage />} />
          <Route path="gestionEncuesta" element={<SurveyModulePage />} />
          <Route path="resumenEncuestaUsuario/:userId" element={<UserSurveySummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
