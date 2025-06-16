import { LastSurvey } from "./components/LastSurvey";
import { MainOverview } from "./components/MainOverview";

export const HomePage = () => {
  return (
    <div className="grid grid-cols-[3fr_1fr] p-4 gap-4 h-full">
      <MainOverview />
      <div className="bg-violet-200 h-full rounded-lg p-4 box-border">
        <div className="bg-white h-full rounded-md p-4 grid grid-rows-[5%_95%] gap-6">
          <p className="text-2xl text-center text-purple-700 font-semibold my-auto">
            Última encuesta
          </p>
          <div className="overflow-y-auto h-full">
            <LastSurvey />
          </div>
        </div>
      </div>
    </div>
  );
};
