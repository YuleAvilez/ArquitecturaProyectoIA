export const ModalLastSurvey = ({ lastSurvey, careerRecommendations, setIsOpen }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all px-2">
            <div className="bg-white/80 dark:bg-slate-900 dark:text-gray-100 backdrop-blur-lg rounded-none sm:rounded-3xl shadow-2xl w-[95%] sm:w-full md:max-w-3xl p-6 sm:p-8 relative animate-popup overflow-y-auto max-h-[90vh] border border-purple-100 dark:border-slate-700 modal-scroll">

                {/* Botón de cerrar */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-5 text-gray-500 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-400 text-2xl font-bold"
                >
                    ×
                </button>

                {/* Título */}
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-300 text-center mb-6">
                    ✨ Detalles de la Encuesta
                </h2>

                {/* Preguntas y respuestas */}
                <div className="grid gap-4">
                    {lastSurvey?.map((x, index) => (
                        <div
                            key={x.surveyQuestionId}
                            className="bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >
                            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                                {index + 1}. {x.question}
                            </p>
                            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 ml-2 italic">
                                {x.answer}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Carreras recomendadas */}
                <h3 className="text-xl sm:text-2xl text-purple-700 dark:text-purple-300 font-semibold mt-8 mb-4 text-center">
                    🎓 Carreras recomendadas
                </h3>

                <div className="grid gap-3">
                    {careerRecommendations?.map((x, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-800 border-l-4 border-purple-400 p-4 rounded-lg shadow-sm"
                        >
                            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                                {x.careerName}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300 ml-2 mt-1">
                                {x.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Botón cerrar */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-5 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 dark:hover:bg-purple-600 transition-all duration-200"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
