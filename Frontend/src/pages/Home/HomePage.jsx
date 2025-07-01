import { HomeAdmin } from "./components/HomeAdmin/HomeAdmin";
import { HomeUser } from "./components/HomeUser/HomeUser";
import { getUserRoleFromToken } from "../../utils";

export const HomePage = () => {
  const role = getUserRoleFromToken();

  return <>{role === 1 ? <HomeAdmin /> : <HomeUser />}</>;
};
