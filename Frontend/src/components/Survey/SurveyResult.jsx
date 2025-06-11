import estudioImg from '../../assets/images/prueba.jpg';

const SurveyResult = ({ career }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
      <img src={estudioImg} className="w-40 h-40 object-cover rounded-full mb-4" />
      <h2 className="text-2xl font-bold text-purple-600 mb-2">¡Gracias por tu tiempo!</h2>
      <p className="text-gray-700 mb-2">
        Según tus respuestas, una carrera ideal para ti podría ser:
      </p>
      <p className="text-xl font-semibold text-purple-500">{career}</p>
    </div> 
  </div>
);

export default SurveyResult;
