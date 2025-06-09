import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import illustration from "../../assets/images/LoginImage4.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, completa ambos campos.");
      return;
    }

    // Aquí podrías agregar validaciones extra si quieres
    toast.success("Inicio de sesión exitoso!");
    navigate("/SurveyPage");
  };
return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-white">
    <div className="bg-white flex-1 flex flex-col w-180 justify-center px-16 py-16 shadow-lg mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-purple-800">Proyecto IA</h1>
      </div>

      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">Holis, welcome</h2>
        <p className="text-lg text-gray-600">Ingresa aquí</p>

        <form className="space-y-6">
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

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900 transition text-lg font-semibold"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
    <div className="hidden lg:flex lg:w-200 bg-purple-300 items-center justify-center">
      <img src={illustration} alt="Illustration" className="max-w-lg" />
    </div>
  </div>
);

}
