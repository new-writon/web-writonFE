import { Outlet } from "react-router-dom";

import Header from "@/components/Common/Header";

const Layout = () => {
  return (
    <>
      {localStorage.getItem("accessToken") && localStorage.getItem("organization") && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
