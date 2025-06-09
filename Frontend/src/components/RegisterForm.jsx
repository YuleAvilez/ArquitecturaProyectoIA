// src/components/RegisterForm.jsx
export default function RegisterForm({ onSwitch }) {
  return (
    <>
    <h2 className="text-3xl font-extrabold text-purple-800 text-center">Crear Cuenta</h2>
    <form className="py-1 grid gap-y-6">
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-1">Nombres</label>
        <input
          type="text"
          className="w-full px-5 py-3 border border-gray-300 rounded-lg text-black focus:ring-4 focus:ring-purple-600 focus:outline-none"
          placeholder="Tu nombre"
        />
      </div>

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

       <div>
        <label className="block text-md font-semibold text-gray-700 mb-1">Confirmar Contraseña</label>
        <input
          type="password"
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
        <button type="button" onClick={onSwitch} className="text-purple-700 hover:underline">
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </form>
    </>
  );
}
