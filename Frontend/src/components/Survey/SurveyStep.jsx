const getPlaceholder = (question) => {
  const q = question.toLowerCase();

  if (q.includes('día libre')) return 'Ej: Saldría a caminar, vería películas, pasaría tiempo con mi familia...';
  if (q.includes('libros') || q.includes('películas') || q.includes('series'))
    return 'Ej: Me gustan los documentales porque aprendo cosas nuevas...';
  if (q.includes('habilidades')) return 'Ej: Soy bueno resolviendo problemas y trabajando en equipo...';
  if (q.includes('logros')) return 'Ej: Terminar el colegio con honores fue muy especial para mí...';
  if (q.includes('cinco años')) return 'Ej: Me gustaría estar trabajando en algo que me apasione...';
  if (q.includes('motiva')) return 'Ej: Mi familia y mi deseo de superarme cada día...';
  if (q.includes('valores')) return 'Ej: La honestidad, la empatía y el compromiso...';
  if (q.includes('causa') || q.includes('problema social')) return 'Ej: Me interesa ayudar a personas sin hogar...';
  if (q.includes('visual') || q.includes('auditiva') || q.includes('práctica')) return 'Ej: Aprendo mejor cuando veo ejemplos gráficos...';
  if (q.includes('personalidad')) return 'Ej: Soy curioso, tranquilo y empático...';

  return 'Escribe tu respuesta aquí...';
};

const SurveyStep = ({ title, questions, answers, onAnswerChange, questionStartIndex }) => (
  <>
    <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-6 text-center">
      {title}
    </h2>
    <div className="space-y-6">
      {questions.map((q, i) => (
        <div key={i} className="space-y-2">
          <label className="flex items-start gap-3 text-base sm:text-lg font-medium text-gray-800">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500 text-white font-bold text-sm mt-1">
              {questionStartIndex + i + 1}
            </span>
            {q.title}
          </label>
          <textarea
            className="w-full min-h-[90px] px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-400 transition-all"
            value={answers[i].answer || ''}
            onChange={(e) => onAnswerChange(i, e.target.value, q.id)}
            placeholder={getPlaceholder(q.title)}
          />
        </div>
      ))}
    </div>
  </>
);

export default SurveyStep;
