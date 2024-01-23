/* eslint-disable react-hooks/rules-of-hooks */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Layout from "@/Layout";
import { ScrollToTop } from "@/components/Common/ScrollToTop";
import { CompletePopupResponsive } from "@/components/atom/WritingPopup/CompletePopup";
import ContentPopupResponsive from "@/components/atom/WritingPopup/ContentPopupResponsive";
import { DeletePopupResponsive } from "@/components/atom/WritingPopup/DeletePopup";
import { KakaoCallback } from "@/pages/Authorization/KakaoCallback";
import LoginPage from "@/pages/Authorization/LoginPage";
import RegisterEmailPage from "@/pages/Authorization/RegisterEmailPage";
import RegisterPage from "@/pages/Authorization/RegisterPage";
import { CommunityPage } from "@/pages/CommunityPage/CommunityPage";
import MainPage from "@/pages/MainPage/MainPage";
import { WritingPage } from "@/pages/WritingPage/WritingPage";
import { modalBackgroundState } from "@/recoil/atoms";

const router = () => {
  const modal = useRecoilValue(modalBackgroundState);
  const PrivateRoute = () => {
    return localStorage.getItem("accessToken") ? <MainPage /> : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      {modal.contentModal && <ContentPopupResponsive />}
      {modal.deleteModal && <DeletePopupResponsive />}
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
