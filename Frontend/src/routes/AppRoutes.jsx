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
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage";
import { PublicRoutes } from "./PublicRoutes";
import { UserSurveySummary } from "../pages/userSurveySummary/userSurveySummaryPage";
import { RoleBasedRoute } from "./ProtectedRoutesRoleBased";


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

          <Route path="SurveyPage" 
            element={
                      <RoleBasedRoute allowedRoles={[2]}>
                        <SurveyPage />
                        </RoleBasedRoute>
                    } />

          <Route path="gestionUsuarios" 
            element={
                      <RoleBasedRoute allowedRoles={[1]}>
                        <UserPage />
                      </RoleBasedRoute>
                    } />

          <Route path="gestionEncuesta" 
            element={
                      <RoleBasedRoute allowedRoles={[1]}>
                        <SurveyModulePage />
                      </RoleBasedRoute>
                    } />

          <Route path="resumenEncuestaUsuario" 
            element={
                      <RoleBasedRoute allowedRoles={[2]}>
                        <UserSurveySummary />
                      </RoleBasedRoute>
                    } />

           <Route path="actualizar-password"
            element={
                     <ChangePasswordPage />
                    } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
