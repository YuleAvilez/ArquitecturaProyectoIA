const SurveyProgress = ({ currentStep, totalSteps }) => (
  <div className="mb-6">
    <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-purple-700 transition-all"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />
    </div>
    <p className="mt-1 text-sm text-gray-600 dark:text-gray-200 text-center">
      Sección {currentStep + 1} de {totalSteps}
    </p>
  </div>
);

export default SurveyProgress;
