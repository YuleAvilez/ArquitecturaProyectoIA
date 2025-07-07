// src/components/RegisterForm.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateUser } from "../services/api/user/createUser";

export default function RegisterForm({ onSwitch, setLoading }) {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(1); // 1 = Hombre, 0 = Mujer

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!userName || !email || !password || !confirmPassword) {
        throw ("Por favor completa todos los campos.");
      }

      if (password !== confirmPassword) {
        throw ("Las contraseñas no coinciden.");
      }

      setLoading(true);
      const result = await CreateUser({
        userName: userName,
        email: email,
        password: password,
        genderId: gender,
      });

      setLoading(false);

      if (result) {
        toast.success("Registro exitoso, ahora inicia sesión!");
        onSwitch(); // Cambia al formulario de login
      } 
    } catch (error) {
      toast.error(error ?? "Error al registrar usuario");
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold text-purple-800 text-center">Crear Cuenta</h2>
      <form className="py-1 grid gap-y-5" onSubmit={handleRegister}>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-500 font-medium">
            {gender === 1 ? "Hombre" : "Mujer"}
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={gender === 1}
              onChange={() => setGender(gender === 1 ? 0 : 1)}
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Correo
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
    </>
  );
}
