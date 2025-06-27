import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading";
import { TableCustom } from "../../components/Table/TableCustom";
import { GetAllModules } from "../../services/api/modules/getAllModules";

export const SurveyModulePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await GetAllModules();
        setData(response);
      } catch (error) {
        toast.error("Ocurrió un error al cargar el resumen.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const columns = [
    { header: "ID", accessor: "moduleId" },
    { header: "Nombre", accessor: "name" },
    { header: "Ruta", accessor: "route" },
  ];

  return (
    <>
      {loading ? <Loading />
        : <div className="p-4 h-full">
          <p className="text-black text-2xl md:text-3xl font-semibold mb-4 dark:text-white">Gestión de preguntas</p>
          <TableCustom
            columns={columns}
            data={data}
            loading={loading} />
        </div>}
    </>
  );
};
