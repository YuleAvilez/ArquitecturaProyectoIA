
const SurveyLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Analizando resultados...</h2>
      <div className="w-full h-3 bg-purple-200 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-purple-700 animate-pulse w-full transition-all duration-1000" />
      </div>
      <p className="text-gray-600 text-sm">Esto puede tardar unos segundos</p>
    </div>
  </div>
);

export default SurveyLoading;
