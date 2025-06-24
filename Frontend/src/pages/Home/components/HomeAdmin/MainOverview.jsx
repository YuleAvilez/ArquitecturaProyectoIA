import { CareerPieChart } from "./graphics/CareerPieChart";
import { UserBarChart } from "./graphics/UserBarChart";

export const MainOverview = () => {
  return (
    <div className="grid grid-rows-[0.6fr_2fr] gap-4 h-full">
      <div className="grid grid-cols-2 gap-4 text-black">
        <div className="rounded-lg bg-violet-200 flex items-center p-4">
          <img src="survey.png" alt="icono_encuesta" className="w-30 h-25" />
          <div className="ml-4">
            <p className="text-3xl font-semibold">Total usuarios</p>
            <p className="text-5xl font-bold text-purple-700 -mt-1">300</p>
          </div>
        </div>
        <div className="rounded-lg bg-violet-200 flex items-center p-4">
          <img src="group.png" alt="icono_grupo" className="w-20 h-20" />
          <div className="ml-4">
            <p className="text-3xl font-semibold">Total de encuestas</p>
            <p className="text-5xl font-bold text-purple-700 -mt-1">280</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CareerPieChart />
        <div className="grid grid-rows-[1fr_2fr] gap-4">
          <div className="bg-purple-800 rounded-xl shadow-lg p-6 flex items-center gap-4">
            <img
              src="start.png"
              alt="icono motivacional"
              className="w-16 h-16"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-white">
                Frase motivacional
              </p>
              <p className="text-sm text-white italic mt-1">
                “Encontrar tu vocación es descubrir el camino donde tu pasión y
                tu propósito se cruzan.”
              </p>
            </div>
          </div>
          <UserBarChart />
        </div>
      </div>
    </div>
  );
};
