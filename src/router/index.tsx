import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/Layout";
import LoginPage from "@/pages/Authorization/LoginPage";
import RegisterEmailPage from "@/pages/Authorization/RegisterEmailPage";
import RegisterPage from "@/pages/Authorization/RegisterPage";
import MainPage from "@/pages/MainPage/MainPage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/registeremail"
          element={<RegisterEmailPage />}
        />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<MainPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
