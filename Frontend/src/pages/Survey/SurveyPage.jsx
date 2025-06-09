import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sections = [
  {
    title: 'Intereses personales',
    questions: [
      'Si tuvieras un día libre para hacer cualquier cosa, ¿qué harías?',
      '¿Qué tipo de libros, películas o series te interesan más y por qué?',
    ],
  },
  {
    title: 'Habilidades y fortalezas',
    questions: [
      '¿Qué habilidades consideras que te destacan?',
      '¿Qué logros personales te han hecho sentir más orgulloso?',
    ],
  },
  {
    title: 'Aspiraciones y metas',
    questions: [
      '¿Dónde te gustaría estar en cinco años?',
      '¿Qué te motiva a seguir adelante cada día?',
    ],
  },
  {
    title: 'Valores y motivaciones',
    questions: [
      '¿Qué valores son más importantes para ti?',
      '¿Qué causa o problema social te gustaría apoyar y por qué?',
    ],
  },
  {
    title: 'Estilo de aprendizaje y personalidad',
    questions: [
      '¿Prefieres aprender de forma visual, auditiva o práctica?',
      '¿Cómo describirías tu personalidad en pocas palabras?',
    ],
  },
];

const SurveyPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(
    sections.map((section) => section.questions.map(() => ''))
  );

  const handleChange = (questionIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step][questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const validateCurrentStep = () => {
    const currentAnswers = answers[step];
    return currentAnswers.every((ans) => ans.trim() !== '');
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.error('Por favor, responde todas las preguntas antes de continuar.');
      return;
    }

    if (step < sections.length - 1) {
      setStep(step + 1);
    } else {
      toast.success('¡Encuesta completada!');
      console.log('Encuesta completada:', answers);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
      <ToastContainer />
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 sm:p-10">

        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-400 text-center mb-2">
          Explorando tu futuro
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Tus respuestas nos ayudarán a conocerte mejor
        </p>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-700 transition-all"
              style={{ width: `${((step + 1) / sections.length) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-600 text-center">
            Sección {step + 1} de {sections.length}
          </p>
        </div>

        {/* Título de sección */}
        <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-6 text-center">
          {sections[step].title}
        </h2>

        {/* Preguntas */}
        <div className="space-y-6">
          {sections[step].questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <label className="flex items-start gap-3 text-base sm:text-lg font-medium text-gray-800">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500 text-white font-bold text-sm mt-1">
                  {index + 1}
                </span>
                {question}
              </label>
              <textarea
                className="w-full min-h-[90px] px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-400 transition-all"
                value={answers[step][index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={step === 0}
            className="bg-black text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-800 disabled:opacity-40 transition"
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            className="bg-black text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-800 transition"
          >
            {step === sections.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
