import { useEffect, useState } from "react";
import { Loading } from "../../../../components/Loading";
import { GetAdminReport } from "../../../../services/api/dashboard/getAdminReport";
import { LastSurvey } from "./LastSurvey";
import { MainOverview } from "./MainOverview";

export const HomeAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAdminReport = async () => {
      try {
        const response = await GetAdminReport();
        setData(response);
      } catch (error) {
        toast.error("Ocurrió un error al cargar el resumen.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminReport();
  }, []);
  return (
    <>
      {loading ?
        <Loading /> :
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] p-4 gap-4 h-full">
          <MainOverview data={data} />

          <div className="bg-violet-200 dark:bg-purple-900 rounded-lg p-4 h-full box-border flex flex-col">
            <div className="bg-white rounded-md p-4 flex flex-col flex-grow overflow-hidden dark:bg-gray-900">
              <p className="text-2xl dark:text-white text-center text-purple-700 font-semibold">
                Última encuesta
              </p>
              <div className="mt-4 flex-grow overflow-y-auto">
                <LastSurvey
                  lastSurvey={data?.lastSurvey}
                  careerRecommendations={data?.careerRecommendations}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
