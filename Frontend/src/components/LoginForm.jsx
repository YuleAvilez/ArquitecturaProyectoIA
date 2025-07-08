// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Login } from "../services/api/user/loginServices";
import { setUserToken } from "../utils";  
export default function LoginForm({ onSwitch, setLoading }) {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try{
    
    if (!email || !password) throw("Por favor, completa ambos campos.");
    
    setLoading(true);

    const result = await Login({
      email: email,
      password: password,
    });

    setUserToken(result.refreshToken); // Guardar el token en localStorage

    setLoading(false);
    navigate("Dashboard");

  }catch (error) {
    toast.error(error || "Error al iniciar sesión");
    setLoading(false);
  }
};

  return (
    <>
      <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-purple-800">Explorando tu futuro</h1>
            <h2 className="text-3xl font-bold text-gray-900">Hola, bienvenido</h2>
            <p className="text-lg text-gray-600">
              Ingresa aquí
            </p>
      </div> 

      <form className="py-8 grid gap-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Link to="/forgot-password" className="text-purple-700 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
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
