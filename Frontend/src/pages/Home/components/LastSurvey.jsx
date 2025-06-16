import { Answers } from "../../../data/DataDashboard";

export const LastSurvey = () => {
  return (
    <div>
      {Answers.surveyAnswers.map((x, index) => (
        <div key={x.surveyQuestionId} className="text-black mb-4">
          <p className="text-sm font-semibold leading-tight">
            {index + 1}. {x.questionText}
          </p>
          <p className="text-xs text-gray-600 mt-1 ml-2">{x.answer}</p>
        </div>
      ))}
      <p className="text-lg text-start text-purple-700 font-semibold my-auto">
        Carreras recomendadas
      </p>
      {Answers.careerRecommendations.map((x) => {
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
