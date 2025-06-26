import { HomeAdmin } from "./components/HomeAdmin/HomeAdmin";
import { HomeUser } from "./components/HomeUser/HomeUser";

export const HomePage = () => {
  const role = 1;

  return <>{role === 1 ? <HomeAdmin /> : <HomeUser />}</>;
};
