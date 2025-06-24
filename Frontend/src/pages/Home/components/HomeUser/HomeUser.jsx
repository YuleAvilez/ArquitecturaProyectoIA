import { careers } from "../../../../data/DataDashboard";

export const HomeUser = () => {
  return (
    <div className="flex flex-col min-h-full p-6 bg-white">
      {/* Título */}
      <div className="mb-6 text-start">
        <p className="text-3xl font-bold text-purple-700">
          Resumen de la encuesta
        </p>
        <p className="text-xl text-gray-600 mt-2">
          Las siguientes carreras fueron recomendadas por la IA según tus
          respuestas.
        </p>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full flex-1">
        {careers.map((career, i) => (
          <div key={i} className="w-full perspective">
            <div className="relative w-full h-[420px] transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
              {/* Frente */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-300 via-fuchsia-200 to-purple-300 rounded-xl flex items-center justify-center text-white shadow-xl px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center">
                  {career.name}
                </h2>
              </div>

              {/* Reverso */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-100 via-pink-100 to-rose-200 rounded-xl p-5 text-gray-800 shadow-xl overflow-y-auto">
                <h3 className="font-bold text-center text-lg mb-2">
                  {career.name}
                </h3>
                <p className="italic text-center mb-3 text-sm">
                  {career.description}
                </p>

                <p className="text-center font-semibold mb-2">
                  💰 Salario promedio:{" "}
                  {career.salary.averageCOP.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  })}
                </p>

                <div className="text-sm">
                  <p className="font-semibold mt-4">📈 Tendencias:</p>
                  <ul className="list-disc list-inside">
                    {career.trends.map((trend, index) => (
                      <li key={index}>{trend}</li>
                    ))}
                  </ul>

                  <p className="font-semibold mt-3">📚 Artículos:</p>
                  <ul className="list-disc list-inside">
                    {career.articles.map((article, index) => (
                      <li key={index}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-800 hover:underline"
                        >
                          {article.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
