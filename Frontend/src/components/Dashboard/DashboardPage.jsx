import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardUser } from "./DashboardUser";
import { getUserRoleFromToken } from "../../utils";

export const DashboardPage = () => {
  const role = getUserRoleFromToken();
  return <>{role === 1 ? <DashboardAdmin /> : <DashboardUser />}</>;
};
