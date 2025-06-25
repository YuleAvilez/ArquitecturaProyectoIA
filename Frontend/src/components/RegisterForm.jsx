import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../services/api/user/registerUsers";

export default function RegisterForm({ onSwitch }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [sexo, setSexo] = useState("1"); // 1 = Hombre, 0 = Mujer

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nombres || !apellidos || !correo || !contraseña || !confirmar) {
      toast.error("Por favor completa todos los campos.");
      return;
    }

    if (contraseña !== confirmar) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const result = await register({
      Nombres: nombres,
      Apellidos: apellidos,
      Correo: correo,
      Contraseña: contraseña,
      Sexo: sexo,
    });

    if (result.success) {
      toast.success("Registro exitoso, ahora inicia sesión!");
      onSwitch(); // Cambia al formulario de login
    } else {
      toast.error(result.message);
    }
  };

  return (
   <div className="max-h-[90vh] overflow-y-auto px-4 scrollbar-hide">
      <h2 className="text-3xl font-extrabold text-purple-800 text-center mb-4">
        Crear Cuenta
      </h2>

      <form className="py-1 grid gap-y-6" onSubmit={handleRegister}>
<div className="flex items-center gap-3 mb-4">
  <span className="text-sm text-gray-500 font-medium">
    {sexo === "1" ? "Hombre" : "Mujer"}
  </span>

  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={sexo === "1"}
      onChange={() => setSexo(sexo === "1" ? "0" : "1")}
    />
    <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer dark:bg-gray-400 peer-checked:bg-purple-600 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
  </label>


</div>

        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Nombres
          </label>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Apellidos
          </label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="Tu apellido"
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Correo
          </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
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
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-900 transition text-lg font-semibold"
          >
            Registrarse
          </button>
        </div>

        <div className="flex justify-center items-center text-sm">
          <button
            type="button"
            onClick={onSwitch}
            className="text-purple-700 hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
}
