import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../components/Dashboard/DashboardPage";
import { HomePage } from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import ForgetPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPassword/ResetPasswordPage"; // Importa la página de restablecimiento de contraseña
import SurveyPage from "../pages/Survey/SurveyPage";
import { SurveyModulePage } from "../pages/SurveyModule/SurveyModulePage";
import { UserPage } from "../pages/Users/UserPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { UserSurveySummary } from "../pages/userSurveySummary/userSurveySummaryPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        }/>
        <Route path="/forgot-password" element={
          <PublicRoutes>
            <ForgetPasswordPage />
          </PublicRoutes>
        }/>
        
        <Route path="/reset-password/:token" element={
          <PublicRoutes>
            <ResetPasswordPage />
          </PublicRoutes>
        }/>

        {/* Rutas protegidas */}

        <Route
          path="/Dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="SurveyPage" element={<SurveyPage />} />
          <Route path="gestionUsuarios" element={<UserPage />} />
          <Route path="gestionEncuesta" element={<SurveyModulePage />} />
          <Route path="resumenEncuestaUsuario" element={<UserSurveySummary />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
