import { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/Layout";
import Loading from "@/components/Common/Loading";
import { ModalProvider } from "@/components/Common/ModalProvider";
import { ScrollToTop } from "@/components/Common/ScrollToTop";
import { SnackBarProvider } from "@/components/Common/SnackBarProvider";

// 동적 로딩을 위한 React.lazy 사용
const KakaoCallback = lazy(() => import("@/pages/Authorization/KakaoCallback"));
const LoginPage = lazy(() => import("@/pages/Authorization/LoginPage"));
const RegisterEmailPage = lazy(() => import("@/pages/Authorization/RegisterEmailPage"));
const RegisterPage = lazy(() => import("@/pages/Authorization/RegisterPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage/CommunityPage"));
const DetailPage = lazy(() => import("@/pages/DetailPage/DetailPage"));
const EditWritingPage = lazy(() => import("@/pages/EditWritingPage/EditWritingPage"));
const MainPage = lazy(() => import("@/pages/MainPage/MainPage"));
const MyPage = lazy(() => import("@/pages/MyPage/MyPage"));
const MyPageMobile = lazy(() => import("@/pages/MyPage/MyPageMobile"));
const NotificationPage = lazy(() => import("@/pages/NotificationPage/NotificationPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage/OnboardingPage"));
const WritingPage = lazy(() => import("@/pages/WritingPage/WritingPage"));

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
      <SnackBarProvider />
      <ModalProvider />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 기본 레이아웃 */}
          <Route
            path="/"
            element={<Layout />}
          >
            {/* 메인 페이지 */}
            <Route
              index
              element={<PrivateRoute />}
            />

            {/* Writing 관련 페이지 */}
            <Route
              path="writing/:date"
              element={<WritingPage />}
            />
            <Route
              path="editwriting/:date"
              element={<EditWritingPage />}
            />

            {/* 커뮤니티 페이지 */}
            <Route
              path="community"
              element={<CommunityPage />}
            />

            {/* 상세 페이지 */}
            <Route
              path="detail/:templateId"
              element={<DetailPage />}
            />

            {/* 마이 페이지 */}
            <Route
              path="mypage"
              element={<MyPage />}
            />
          </Route>

          {/* 로그인 및 회원가입 관련 페이지 */}
          <Route
            path="login"
            element={<LoginPage />}
          />
          <Route
            path="register"
            element={<RegisterPage />}
          />
          <Route
            path="registeremail"
            element={<RegisterEmailPage />}
          />
          <Route
            path="auth/kakao/callback"
            element={<KakaoCallback />}
          />

          {/* 온보딩 페이지 */}
          <Route
            path="onboarding"
            element={<OnboardingPage />}
          />

          {/* 모바일 페이지들 */}
          <Route
            path="mypageMobile"
            element={<MyPageMobile />}
          />
          <Route
            path="notificationMobile"
            element={<NotificationPage />}
          />
          <Route
            path="notificationMobile/detail/:templateId"
            element={<DetailPage />}
          />

          {/* Not Found 페이지 처리 */}
          <Route
            path="*"
            element={<div>Not Found</div>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default router;
