import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/api/user/loginServices";

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, completa ambos campos.");
      return;
    }

    const result = await login({ Correo: email, Contraseña: password });

    if (result.success) {
      localStorage.setItem("token", result.token); 
      toast.success("Inicio de sesión exitoso!");
      navigate("/SurveyPage");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800">Proyecto IA</h1>
        <h2 className="text-4xl font-bold text-gray-900">Hola, bienvenido</h2>
        <p className="text-lg text-gray-600">Ingresa aquí</p>
      </div>

      <form className="py-8 grid gap-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail
              (e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-purple-700 hover:underline"
          >
            ¿Olvidaste la contraseña?
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900 transition text-lg font-semibold"
          >
            Iniciar sesión
          </button>
        </div>

        <div className="flex justify-center items-center text-sm">
          <button type="button" onClick={onSwitch} className="text-purple-700 hover:underline">
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </form>
    </>
  );
}
