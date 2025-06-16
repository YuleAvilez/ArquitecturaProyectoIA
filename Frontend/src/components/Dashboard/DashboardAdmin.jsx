import { NavLink, Outlet } from "react-router-dom";
import { Modules } from "../../data/DataDashboard";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const DashboardAdmin = () => {
  return (
    <div className="grid grid-cols-[20%_80%] h-screen">
      <div className="bg-purple-700 text-white p-4">
        <div className="flex items-end">
          <img src="logo.png" alt="logo" className="w-24 mx-auto" />
        </div>

        <nav className="space-y-2">
          {Modules.map((x) => {
            return (
              <NavLink
                key={x.moduleId}
                to={x.route}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-white font-semibold hover:bg-purple-800"
              >
                {x.icon()}
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
        <div style={{ backgroundColor: "#e4e7ec" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
