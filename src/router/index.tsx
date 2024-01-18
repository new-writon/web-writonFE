import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/Layout";
import { ScrollToTop } from "@/components/Common/ScrollToTop";
import { KakaoCallback } from "@/pages/Authorization/KakaoCallback";
import LoginPage from "@/pages/Authorization/LoginPage";
import RegisterEmailPage from "@/pages/Authorization/RegisterEmailPage";
import RegisterPage from "@/pages/Authorization/RegisterPage";
import { CommunityPage } from "@/pages/CommunityPage/CommunityPage";
import MainPage from "@/pages/MainPage/MainPage";
import { WritingPage } from "@/pages/WritingPage/WritingPage";

const router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route
            path="/writing/:date"
            element={<WritingPage />}
          />
          <Route
            path="/community"
            element={<CommunityPage />}
          />
          <Route
            path="/auth/kakao/callback"
            element={<KakaoCallback />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
