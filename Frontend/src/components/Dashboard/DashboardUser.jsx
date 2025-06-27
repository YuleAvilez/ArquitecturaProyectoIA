import { NavLink, Outlet } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { UserMenu } from "./UserMenu";

export const DashboardUser = () => {
  return (
    <div className="grid grid-rows-[12%_88%] h-screen">
      <div className="dark:bg-purple-950 bg-purple-700 flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <NavLink
            to="/Dashboard"
            end
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded transition-all ${isActive ? "bg-purple-800" : "hover:bg-purple-800"
              }`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/Dashboard/resumenEncuestaUsuario"
            end
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded transition-all ${isActive ? "bg-purple-800" : "hover:bg-purple-800"
              }`
            }
          >
            Encuesta
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>

      <div className="bg-[#e4e7ec] dark:bg-gray-800 overflow-y-auto h-full max-h-full modal-scroll">
        <Outlet />
      </div>
    </div>
  );
};
