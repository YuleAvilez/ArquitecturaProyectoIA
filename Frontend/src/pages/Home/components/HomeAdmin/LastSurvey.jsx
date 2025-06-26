import { useState } from "react";
import { ModalLastSurvey } from "./ModalLastSurvey";

export const LastSurvey = ({ lastSurvey, careerRecommendations }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {lastSurvey?.slice(0, 2).map((x, index) => (
          <div key={x.surveyQuestionId} className="text-black mb-4 dark:text-white">
            <p className="text-sm font-semibold leading-tight">
              {index + 1}. {x.question}
            </p>
            <p className="text-xs text-gray-600 mt-1 ml-2 dark:text-gray-400">{x.answer}</p>
          </div>
        ))}
        <p className="text-xl text-start text-purple-700 mb-4 font-semibold my-auto dark:text-white">
          Recomendaciones
        </p>
        {careerRecommendations?.map((x, i) => (
          <div key={i} className="text-black mb-2">
            <p className="text-sm font-semibold leading-tight dark:text-white">{x.careerName}</p>
          </div>
        ))}
        <p className="text-sm text-blue-600 underline hover:text-blue-800 transition mt-2 w-fit dark:text-white">
          Ver resumen
        </p>
      </div>

      {/* Modal */}
      {isOpen && (
        <ModalLastSurvey lastSurvey={lastSurvey} careerRecommendations={careerRecommendations} setIsOpen={setIsOpen} />
      )}
    </>
  );
};
