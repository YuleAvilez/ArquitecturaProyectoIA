import {
  ClipboardDocumentIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Outlet } from "react-router-dom";
import { GetAllModules } from "../../services/api/modules/getAllModules";
import { Loading } from "../Loading";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const DashboardAdmin = () => {
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

  const moduleIcons = [
    <HomeIcon className="w-5 h-5" />,
    <UserGroupIcon className="w-5 h-5" />,
    <ClipboardDocumentIcon className="w-5 h-5" />,
  ];

  return (
    <>
      {loading ? <Loading /> : <div className="grid grid-cols-[20%_80%] h-screen">
        <div className="bg-purple-700 text-white p-4">
          <div className="flex items-end">
            <img src="logo.png" alt="logo" className="w-24 mx-auto" />
          </div>

          <nav className="space-y-2">
            {data?.map((x, i) => {
              return (
                <NavLink
                  key={x.moduleId}
                  to={x.route}
                  className="flex items-center gap-3 px-4 py-2 rounded-md text-white font-semibold hover:bg-purple-800"
                >
                  {moduleIcons[index] ?? <HomeIcon className="w-5 h-5" />}
                  {x.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="bg-white grid grid-rows-[8%_92%]">
          <div className="flex justify-end items-center p-1 gap-2">
            <ThemeToggle />
            <img
              className="inline-block size-12 rounded-full ring-2 ring-white"
              src="avatar_user.jpg"
              alt="avatar"
            />
          </div>
          <div style={{ backgroundColor: "#e4e7ec" }} className="overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>}
    </>
  );
};
