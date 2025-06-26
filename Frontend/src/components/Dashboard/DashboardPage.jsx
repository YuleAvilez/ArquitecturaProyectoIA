import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardUser } from "./DashboardUser";

export const DashboardPage = () => {
  const role = 1; // 1: admin, 2: user

  return <>{role === 1 ? <DashboardAdmin /> : <DashboardUser />}</>;
};
