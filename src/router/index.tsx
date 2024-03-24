/* eslint-disable react-hooks/rules-of-hooks */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/Layout";
import { ModalProvider } from "@/components/Common/ModalProvider";
import { ScrollToTop } from "@/components/Common/ScrollToTop";
import { KakaoCallback } from "@/pages/Authorization/KakaoCallback";
import LoginPage from "@/pages/Authorization/LoginPage";
import RegisterEmailPage from "@/pages/Authorization/RegisterEmailPage";
import RegisterPage from "@/pages/Authorization/RegisterPage";
import { CommunityPage } from "@/pages/CommunityPage/CommunityPage";
import { DetailPage } from "@/pages/DetailPage/DetailPage";
import { EditWritingPage } from "@/pages/EditWritingPage/EditWritingPage";
import MainPage from "@/pages/MainPage/MainPage";
import { MyPage } from "@/pages/MyPage/MyPage";
import { MyPageMobile } from "@/pages/MyPage/MyPageMobile";
import { NotificationPage } from "@/pages/NotificationPage/NotificationPage";
import { OnboardingPage } from "@/pages/OnboardingPage/OnboardingPage";
import { WritingPage } from "@/pages/WritingPage/WritingPage";

const router = () => {
  const PrivateRoute = () => {
    return localStorage.getItem("accessToken") && localStorage.getItem("organization") ? (
      <MainPage />
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <BrowserRouter>
      <ModalProvider />
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
        <Route
          path="/auth/kakao/callback"
          element={<KakaoCallback />}
        />
        <Route
          path="/onboarding"
          element={<OnboardingPage />}
        />
        <Route
          path="/mypageMobile"
          element={<MyPageMobile />}
        />
        <Route
          path="/notificationMobile"
          element={<NotificationPage />}
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
            path="/editwriting/:date"
            element={<EditWritingPage />}
          />
          <Route
            path="/community"
            element={<CommunityPage />}
          />
          <Route
            path="/detail/:templeteId"
            element={<DetailPage />}
          />

          {/* 알림창에서 디테일 들어가기 (모바일) */}
          <Route
            path="/notificationMobile/detail/:templeteId"
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
