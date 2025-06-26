import {
  Bars3Icon,
  ClipboardDocumentIcon,
  HomeIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GetAllModules } from "../../services/api/modules/getAllModules";
import { UserMenu } from "../Dashboard/UserMenu";
import { Loading } from "../Loading";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Botón hamburguesa visible solo en pantallas pequeñas */}
          <div className="md:hidden p-2 flex justify-between items-center bg-purple-700 dark:bg-purple-950 text-white">
            <img src="logo.png" alt="logo" className="w-24" />
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="focus:outline-none"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="w-8 h-8" />
              ) : (
                <Bars3Icon className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`bg-purple-700 dark:bg-purple-950 text-white p-4 md:relative z-50
            ${isSidebarOpen ? "fixed inset-y-0 left-0 w-64" : "hidden"}
            md:block md:w-1/5 transition-all duration-300`}
          >
            <div className="hidden md:flex items-end mb-4">
              <img src="logo.png" alt="logo" className="w-24 mx-auto" />
            </div>

            <nav className="space-y-2">
              {data?.map((x, i) => (
                <NavLink
                  key={x.moduleId}
                  to={x.route}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-md text-white font-semibold hover:bg-purple-800"
                >
                  {moduleIcons[i] ?? <HomeIcon className="w-5 h-5" />}
                  {x.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 bg-white grid grid-rows-[auto_1fr] h-screen">
            {/* Barra superior */}
            <div className="flex justify-end items-center p-2 bg-white dark:bg-gray-900">
              <ThemeToggle />
              <UserMenu />
            </div>

            {/* Contenido dinámico */}
            <div className="bg-[#e4e7ec] dark:bg-gray-800 overflow-y-auto h-full max-h-full modal-scroll">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
