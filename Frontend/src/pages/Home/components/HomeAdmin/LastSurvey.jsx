export const LastSurvey = ({ lastSurvey, careerRecommendations }) => {
  return (
    <div>
      {lastSurvey.map((x, index) => (
        <div key={x.surveyQuestionId} className="text-black mb-4">
          <p className="text-sm font-semibold leading-tight">
            {index + 1}. {x.question}
          </p>
          <p className="text-xs text-gray-600 mt-1 ml-2">{x.answer}</p>
        </div>
      ))}
      <p className="text-lg text-start text-purple-700 font-semibold my-auto">
        Carreras recomendadas
      </p>
      {careerRecommendations.map((x) => {
        return (
          <div key={x.careerRecommendationId} className="text-black mb-4">
            <p className="text-sm font-semibold leading-tight">
              {x.careerName}
            </p>
            <p className="text-xs text-gray-600 mt-1 ml-2">{x.description}</p>
          </div>
        );
      })}
    </div>
  );
};
