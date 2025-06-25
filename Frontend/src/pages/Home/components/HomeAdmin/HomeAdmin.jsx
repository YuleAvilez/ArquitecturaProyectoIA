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
    <div className="grid grid-cols-[3fr_1fr] p-4 gap-4 h-full">
      <MainOverview loading={loading} data={data} />
      <div className="bg-violet-200 h-full rounded-lg p-4 box-border">
        <div className="bg-white h-full rounded-md p-4 grid grid-rows-[5%_95%] gap-6">
          <p className="text-2xl text-center text-purple-700 font-semibold my-auto">
            Última encuesta
          </p>
          <div className="overflow-y-auto h-full">
            <LastSurvey lastSurvey={data?.lastSurvey} careerRecommendations={data?.careerRecommendations} />
          </div>
        </div>
      </div>
    </div>
  );
};
