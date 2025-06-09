import { useState } from "react";
import illustration from "../../assets/images/LoginImage4.jpg";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(true); // para retrasar el cambio de formulario
  const animacion = 'transform transition-all duration-700 ease-in-out '; // para retrasar el cambio de formulario

  const toggleForm = () => {
    setShowLogin((prev) => !prev);

    // sincroniza el cambio de formulario después de la animación
    setTimeout(() => {
      setShowForm((prev) => !prev);
    }, 250); // mismo valor que la duración de tu transición
  };

  return (
    <div className={`w-screen h-screen grid lg:grid-cols-2 overflow-hidden ${animacion} bg-white`}>
      
      <div
        className={`
          left px-8 py-12
          flex flex-col justify-center
          ${animacion}
          ${showLogin ? "translate-x-0" : "lg:translate-x-full"}`}
      >
        {showForm ? <LoginForm onSwitch={toggleForm} /> : <RegisterForm onSwitch={toggleForm} />}
      </div>

      <div
        className={`right lg:flex hidden items-center justify-center bg-purple-300 p-8 ${animacion} ${
          showLogin ? "translate-x-0" : "lg:-translate-x-full"
        }`}
      >
        <img
          src={illustration}
          alt="Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
