import { useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../../assets/images/LoginImage4.jpg";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/api/user/forgotPasswordService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, ingresa tu correo.");
      return;
    }

    try {
     const data = await forgotPassword({ correo: email.trim() });
      toast.success(data.message || "Correo enviado");
      navigate("/");
    } catch (err) {
      toast.error("Ocurrió un error al enviar el correo.");
    }
  };

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 overflow-hidden bg-white">
      <div className="left px-8 py-12 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Recuperar contraseña</h1>
        <p className="text-lg text-gray-600 mb-8">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-y-6">
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

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900 transition text-lg font-semibold"
          >
            Enviar enlace
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-purple-600 hover:underline text-sm mt-2 text-left"
          >
            ← Volver al login
          </button>
        </form>
      </div>

      {/* Imagen */}
      <div className="right lg:flex hidden items-center justify-center bg-purple-300 p-8">
        <img
          src={illustration}
          alt="Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
