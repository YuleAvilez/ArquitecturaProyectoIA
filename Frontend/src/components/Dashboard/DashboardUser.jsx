import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const DashboardUser = () => {
  return (
    <div className="grid grid-rows-[8%_92%] h-screen">
      <div className="bg-purple-700 flex justify-end items-center p-2 gap-2">
        <ThemeToggle />
        <img
          className="bg-white inline-block size-10 rounded-full ring-2 ring-white"
          src="avatar_user.jpg"
          alt="avatar"
        />
      </div>
      <div>
        <div className="h-full bg-[#e4e7ec] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
