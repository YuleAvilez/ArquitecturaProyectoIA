const SurveyStep = ({ title, questions, answers, onAnswerChange }) => (
  <>
    <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-6 text-center">
      {title}
    </h2>
    <div className="space-y-6">
      {questions.map((q, i) => (
        <div key={i} className="space-y-2">
          <label className="flex items-start gap-3 text-base sm:text-lg font-medium text-gray-800">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500 text-white font-bold text-sm mt-1">
              {i + 1}
            </span>
            {q}
          </label>
          <textarea
            className="w-full min-h-[90px] px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-400 transition-all"
            value={answers[i]}
            onChange={(e) => onAnswerChange(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  </>
);

export default SurveyStep;
