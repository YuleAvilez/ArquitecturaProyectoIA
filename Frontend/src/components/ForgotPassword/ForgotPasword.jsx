import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/api/user/forgotPasswordService";

export default function ForgotPasswordForm() {
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo) {
      toast.error("Por favor, ingresa tu correo.");
      return;
    }

    const result = await forgotPassword({ Correo: correo });

    if (result.success) {
      toast.success("¡Enlace enviado! Revisa tu correo.");
      setTimeout(() => navigate("/"), 1000); // Redirige después de 2 seg
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800">Recuperar contraseña</h1>
        <p className="text-lg text-gray-600">Ingresa tu correo para recibir el enlace</p>
      </div>

      <form className="py-8 grid gap-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900 transition text-lg font-semibold"
          >
            Enviar enlace
          </button>
        </div>
      </form>
    </>
  );
}
