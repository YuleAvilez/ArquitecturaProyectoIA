import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import estudioImg from '../../assets/images/prueba.jpg';

const SurveyResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Dashboard'); // Redirige a la página de resumen
    }, 5000); // Redirige después de 5 segundos
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  return(  
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 flex flex-col items-center text-center overflow-hidden">
      <img src={estudioImg} className="w-40 h-40 object-cover rounded-full mb-4" />
      <h2 className="text-2xl font-bold text-purple-600 mb-2">¡Gracias por tu tiempo!</h2>
      <p className="text-gray-700 mb-6">
        En unos segundos podrás ver el resumen con los resultados de tu encuesta.
      </p>
      <div className="w-full h-[4.5px] bg-purple-100 rounded-full overflow-hidden ">
        <div className="h-full bg-purple-700 animate-pulse transition-all duration-100" />
      </div>
    </div>
  </div>
);
}

export default SurveyResult;
