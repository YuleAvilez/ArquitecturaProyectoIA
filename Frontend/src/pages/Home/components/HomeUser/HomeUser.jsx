import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../../../components/Loading";
import { GetUserReport } from "../../../../services/api/dashboard/getUserReport";
import { getUserIdFromToken } from "../../../../utils";

export const HomeUser = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromToken();
        if (!userId)
          throw("No se encontró el usuario inicie sesión nuevamente.");
        
        const response = await GetUserReport(userId);
        setData(response);
      } catch (error) {
        if (error.includes("No existe una encuesta")) {
          navigate("SurveyPage");
        } else {
          toast.error("Ocurrió un error al cargar el resumen.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? <Loading /> :
        <div className="flex flex-col min-h-full p-4">
          {/* Título */}
          <div className="mb-4 text-start">
            <p className="text-2xl font-bold text-purple-700 dark:text-white">
              Resumen de la encuesta
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400">
              Las siguientes carreras fueron recomendadas por la IA según tus
              respuestas.
            </p>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full flex-1 h-full">
            {data?.data?.map((x, i) => (
              <div key={i} className="w-full perspective">
                {/* Contenedor giratorio */}
                <div className="relative w-full h-[350px] transition-transform duration-700 transform-style-preserve-3d group hover:rotate-y-180">

                  {/* Frente */}
                  <div className="absolute w-full h-full backface-hidden 
      bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-600 
      dark:from-purple-800 dark:via-fuchsia-800 dark:to-pink-900 
      rounded-xl flex items-center justify-center text-white shadow-xl px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                      {x.careerName}
                    </h2>
                  </div>

                  {/* Reverso */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 
      bg-gradient-to-br from-purple-100 via-pink-100 to-rose-200 
      dark:from-gray-700 dark:via-purple-800 dark:to-fuchsia-900 
      rounded-xl p-5 text-gray-800 shadow-xl overflow-y-auto modal-scroll dark:text-white">

                    <h3 className="font-bold text-center text-lg mb-2">{x.careerName}</h3>
                    <p className="italic text-center mb-3 text-sm">{x.description}</p>

                    <p className="text-center font-semibold mb-2">
                      💰 Salario promedio:{" "}
                      {parseInt(x.salary).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      })}
                    </p>

                    <div className="text-sm">
                      <p className="font-semibold mt-4">📈 Tendencias:</p>
                      <ul className="list-disc list-inside">
                        {x.trends.map((trend, index) => (
                          <li key={index}>{trend}</li>
                        ))}
                      </ul>

                      <p className="font-semibold mt-3">📚 Artículos:</p>
                      <ul className="list-disc list-inside">
                        {x.sources.map((source, index) => (
                          <li key={index}>{source.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>}
    </>

  );
};
