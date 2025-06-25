import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import illustration from "../../assets/images/LoginImage4.jpg";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Por favor, completa ambos campos.");
      return;
    }

    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:3001/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Contraseña: password.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message || "Error al restablecer la contraseña");
      }
    } catch (err) {
      toast.error("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 overflow-hidden bg-white">
      <div className="left px-8 py-12 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Restablecer Contraseña</h1>
        <p className="text-gray-600 mb-6">Ingresa tu nueva contraseña</p>

        <form className="grid gap-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-md font-semibold text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-md font-semibold text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
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
            {loading ? "Guardando..." : "Guardar nueva contraseña"}
          </button>
        </form>

        <button
          className="mt-6 text-sm text-purple-600 hover:underline"
          onClick={() => navigate("/")}
        >
          ← Volver al inicio
        </button>
      </div>

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
