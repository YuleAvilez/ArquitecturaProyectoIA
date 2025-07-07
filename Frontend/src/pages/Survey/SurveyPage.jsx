import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SurveyStep from '../../components/Survey/SurveyStep';
import SurveyProgress from '../../components/Survey/SurveyProgress';
import SurveyLoading from '../../components/Survey/SurveyLoading';
import SurveyResult from '../../components/Survey/SurveyResult';
import { Loading } from '../../components/Loading';
import { GetAllSurveyQuestionsList } from '../../services/api/SurveyQuestion/getAllSurveyQuestionListService';

const SurveyPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState("");
  const [status, setStatus] = useState('form');
  const [career, setCareer] = useState('Ingeniería en Sistemas');
  const [surveySections, setSurveySections] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    
    const loadQuestions = async () => {
      setLoad(true);
      try {
        const response = await GetAllSurveyQuestionsList();

      if (response && response.length > 0) {
        const sections = response.map((section) => ({
          title: section.title,
          questions: section.questions.map((question) => question.title),
        }));
        
        setSurveySections(sections);
        setAnswers(sections.map((s) => s.questions.map(() => '')));
        setLoad(false);
      }
      } catch (error) {
        setLoad(false);
        toast.error(error);
      }
    }
    loadQuestions();

  }, [])
  

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[step][index] = [step, value];
    setAnswers(updated);
    console.log('Respuestas actualizadas:', updated);
  };

  const handleNext = () => {
    if (answers[step].some((ans) => ans.trim() === '')) {
      toast.error('Por favor, responde todas las preguntas.');
      return;
    }

    if (step < surveySections.length - 1) {
      setStep(step + 1);
    } else {
      console.log('Respuestas finales:', answers);
      toast.success('¡Encuesta completada!');
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  if (status === 'loading') return <SurveyLoading />;
  if (status === 'result') return <SurveyResult career={career} />;

  const questionStartIndex = surveySections
    .slice(0, step)
    .reduce((acc, section) => acc + section.questions.length, 0);

  return (
    <>
      {load ? <Loading /> 
      :
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
      <ToastContainer />
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-400 text-center mb-2">
          Explorando tu futuro
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Tus respuestas nos ayudarán a conocerte mejor
        </p>

        <SurveyProgress currentStep={step} totalSteps={surveySections.length} />

        <SurveyStep
          title={surveySections[step].title}
          questions={surveySections[step].questions}
          answers={answers[step]}
          onAnswerChange={handleChange}
          questionStartIndex={questionStartIndex}
        />

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
            {step === surveySections.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div> 
      }
    </>
  );
};

export default SurveyPage;
