import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../Pages/Login/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);
