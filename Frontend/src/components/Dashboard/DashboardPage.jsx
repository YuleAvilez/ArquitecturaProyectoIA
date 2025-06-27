import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardUser } from "./DashboardUser";

export const DashboardPage = () => {
  const role = 2; // 1: admin, 2: user

  return <>{role === 1 ? <DashboardAdmin /> : <DashboardUser />}</>;
};
