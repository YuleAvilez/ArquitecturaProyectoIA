import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading";
import { GetSurveyByUserId } from "../../services/api/user/getSurveyByUserId";
import { getUserIdFromToken } from "../../utils";

export const UserSurveySummary = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            const userId = getUserIdFromToken();

            if (!userId) {
                toast.error("No se encontró el usuario. Inicia sesión nuevamente.");
                setLoading(false);
                return;
            }

            try {
                const response = await GetSurveyByUserId();
                setData(response);
            } catch (error) {
                if (
                    typeof error?.response?.data?.message === "string" &&
                    error.response.data.message.includes("No existe una encuesta")
                ) {
                    toast.info("No se encontró una encuesta registrada.");
                    navigate("SurveyPage");
                } else {
                    toast.error("Ocurrió un error al cargar el resumen.");
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, []);

    const noData = !data || data.length === 0;

    if (loading) return <Loading />;

    return (
        <>
            {noData ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2">
                        No se encontró información de la encuesta.
                    </p>
                    <p className="text-md text-purple-700 dark:text-purple-400 font-semibold">
                        Inicia sesión nuevamente.
                    </p>
                </div>
            ) : (
                <div className="p-4 h-full">
                    <p className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-white text-center mb-6">
                        Resumen de la encuesta del usuario
                    </p>
                    <div className="grid gap-4">
                        {data.map((x, index) => (
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
                </div>
            )}
        </>
    );
};
