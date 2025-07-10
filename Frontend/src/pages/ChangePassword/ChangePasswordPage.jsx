import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePasswordService } from "../../services/api/user/changePasswordService";
import illustration from "../../assets/images/LoginImage4.jpg";
import illustration2 from "../../assets/images/logindark.png";

import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";

export default function ChangePasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  useEffect(() => {
    const checkTheme = () => {
      const root = window.document.documentElement;
      setIsDarkMode(root.classList.contains("dark"));
    };

    checkTheme();
    // Observa cambios en el atributo 'class' del elemento <html>
    // para detectar cambios en el tema (oscuro/claro)

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    

  return () => observer.disconnect();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const response = await changePasswordService({
        userId,
        currentPassword,
        newPassword,
      });

      if (response.success) {
        toast.success("Contraseña actualizada con éxito");
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Ocurrió un error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return toast.error("Usuario no encontrado");

  return (
  <div className="w-full min-h-screen grid lg:grid-cols-2 overflow-hidden bg-white dark:bg-gray-800">

      <div className="left px-8 py-12 flex flex-col justify-center relative">


        <h1 className="text-4xl font-extrabold text-purple-800 dark:text-purple-300 mb-2">
          Actualizar Contraseña
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Cambia tu contraseña</p>

        <form className="grid gap-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Contraseña Actual
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg 
              text-black dark:text-white bg-white dark:bg-gray-800 
              focus:ring-4 focus:ring-purple-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg 
              text-black dark:text-white bg-white dark:bg-gray-800 
              focus:ring-4 focus:ring-purple-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-md font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg 
              text-black dark:text-white bg-white dark:bg-gray-800 
              focus:ring-4 focus:ring-purple-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full bg-purple-700 text-white py-3 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-900"
            } transition text-lg font-semibold`}
          >
            {loading ? "Actualizando..." : "Guardar nueva contraseña"}
          </button>
        </form>

        <button
          className="mt-6 text-sm text-purple-600 dark:text-purple-400 hover:underline"
          onClick={() => navigate("/")}
        >
          ← Volver al inicio
        </button>
      </div>

      <div className="right lg:flex hidden items-center justify-center bg-purple-300 dark:bg-gray-900 p-8">
        <img
          src={isDarkMode ? illustration2 : illustration}
          alt="Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
