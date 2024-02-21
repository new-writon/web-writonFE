/* eslint-disable react-hooks/rules-of-hooks */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Layout from "@/Layout";
import { ScrollToTop } from "@/components/Common/ScrollToTop";
import { CompletePopupResponsive } from "@/components/atom/WritingPopup/CompletePopup";
import { KakaoCallback } from "@/pages/Authorization/KakaoCallback";
import LoginPage from "@/pages/Authorization/LoginPage";
import RegisterEmailPage from "@/pages/Authorization/RegisterEmailPage";
import RegisterPage from "@/pages/Authorization/RegisterPage";
import { CommunityPage } from "@/pages/CommunityPage/CommunityPage";
import { DetailPage } from "@/pages/DetailPage/DetailPage";
import MainPage from "@/pages/MainPage/MainPage";
import { MyPage } from "@/pages/MyPage/MyPage";
import { OnboardingPage } from "@/pages/OnboardingPage/OnboardingPage";
import { WritingPage } from "@/pages/WritingPage/WritingPage";
import { modalBackgroundState } from "@/recoil/atoms";

const router = () => {
  const modal = useRecoilValue(modalBackgroundState);

  const PrivateRoute = () => {
    return localStorage.getItem("accessToken") && localStorage.getItem("organization") ? (
      <MainPage />
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      {modal.completeModal && <CompletePopupResponsive />}
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
        <Route
          path="/auth/kakao/callback"
          element={<KakaoCallback />}
        />
        <Route
          path="/onboarding"
          element={<OnboardingPage />}
        />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<PrivateRoute />}
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
            path="/detail/:templeteId"
            element={<DetailPage />}
          />
          <Route
            path="/mypage"
            element={<MyPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
