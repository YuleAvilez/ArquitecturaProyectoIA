import { CareerPieChart } from "./graphics/CareerPieChart";
import { UserBarChart } from "./graphics/UserBarChart";

export const MainOverview = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* Sección de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Total Usuarios */}
        <div className="rounded-lg bg-violet-200 dark:bg-purple-900 dark:text-white text-black flex items-center p-4 w-full h-full min-h-[120px]">
          <img
            src="/survey.png"
            alt="icono_encuesta"
            className="w-20 h-20 object-contain"
          />
          <div className="ml-4">
            <p className="text-2xl md:text-3xl font-semibold">Total usuarios</p>
            <p className="text-4xl md:text-5xl font-bold text-purple-700 dark:text-purple-300 -mt-1">
              {data?.totalUsers}
            </p>
          </div>
        </div>

        {/* Total Encuestas */}
        <div className="rounded-lg bg-violet-200 dark:bg-purple-900 dark:text-white text-black flex items-center p-4 w-full h-full min-h-[120px]">
          <img
            src="/group.png"
            alt="icono_grupo"
            className="w-20 h-20 object-contain"
          />
          <div className="ml-4">
            <p className="text-2xl md:text-3xl font-semibold">Total encuestas</p>
            <p className="text-4xl md:text-5xl font-bold text-purple-700 dark:text-purple-300 -mt-1">
              {data?.totalSurveys}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full flex-grow">
        {/* Pie Chart */}
        <div className="w-full h-full">
          <CareerPieChart countByCareer={data?.countByCareer} />
        </div>

        {/* Frase + gráfico */}
        <div className="flex flex-col gap-4 w-full h-full">
          {/* Frase motivacional */}
          <div className="bg-purple-800 dark:bg-purple-950 text-white rounded-xl shadow-lg p-6 flex items-start gap-4">
            <img
              src="/start.png"
              alt="icono motivacional"
              className="w-16 h-16 object-contain"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Frase motivacional</p>
              <p className="text-sm italic mt-1">
                “Encontrar tu vocación es descubrir el camino donde tu
                pasión y tu propósito se cruzan.”
              </p>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full flex-grow">
            <UserBarChart userByGenders={data?.userByGenders} />
          </div>
        </div>
      </div>
    </div>
  );
};
