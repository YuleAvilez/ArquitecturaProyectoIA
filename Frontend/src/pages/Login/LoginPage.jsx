// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import illustration from "../../assets/images/LoginImage4.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, completa ambos campos.");
      return;
    }

    toast.success("Inicio de sesión exitoso!");
    navigate("/SurveyPage");
  };

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 overflow-hidden bg-white">
      <div className="left px-8 py-12 flex flex-col justify-center">
        <div className="Tittle grid gap-y-8">
          <h1 className="text-4xl font-extrabold text-purple-800">Proyecto IA</h1>
          <h2 className="text-4xl font-bold text-gray-900">Hola, bienvenido</h2>
          <p className="text-lg text-gray-600">Ingresa aquí</p>
        </div>

        <form className="formulario-login py-8 grid gap-y-6">
          <div>
            <label className="block text-md font-semibold text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-md font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-purple-700 hover:underline">
              ¿Olvidaste la contraseña?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900 transition text-lg font-semibold"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>

      <div className="right hidden lg:flex items-center justify-center bg-purple-300 p-8">
        <img
          src={illustration}
          alt="Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
