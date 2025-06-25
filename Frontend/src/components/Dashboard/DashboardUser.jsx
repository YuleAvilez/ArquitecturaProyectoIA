import { Outlet, NavLink } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const DashboardUser = () => {
  return (
    <div className="grid grid-rows-[8%_92%] h-screen">
      <div className="bg-purple-700 flex justify-between items-center p-6">
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
            to="/Dashboard/resumenEncuestaUsuario/:userId"
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
          <img
            className="bg-white inline-block size-10 rounded-full ring-2 ring-white"
            src="avatar_user.jpg"
            alt="avatar"
          />
        </div>
      </div>

      <div className="h-full bg-[#e4e7ec] overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
