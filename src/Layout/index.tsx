import { Outlet } from "react-router-dom";

import Header from "@/components/Common/Header";
import { useAuth } from "@/components/Common/AuthProvider";

const Layout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return null;

  return (
    <>
      {isAuthenticated && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
