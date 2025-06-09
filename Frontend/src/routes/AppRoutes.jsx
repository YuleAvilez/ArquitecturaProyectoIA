// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import SurveyPage from "../pages/Survey/SurveyPage"; // Importa la página de encuesta

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SurveyPage" element={<SurveyPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}
