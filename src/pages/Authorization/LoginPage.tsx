import { useEffect, useState } from "react";

import styled from "styled-components";

import Login from "@/components/Authorization/LoginPage";
import { isPWA } from "@/utils/isPWA";
import Splash from "../Splash/Splash";

const LoginPage = () => {
  useEffect(() => {
    // 페이지 로드 시 실행되는 코드
    const organization = new URL(window.location.href).searchParams.get("organization");
    const challengeId = new URL(window.location.href).searchParams.get("challengeId");
    if (organization && challengeId) {
      localStorage.setItem("organization", organization);
      localStorage.setItem("challengeId", challengeId);
    }
    if (
      localStorage.getItem("accessToken") ||
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("accessToken") ||
      sessionStorage.getItem("refreshToken")
    ) {
      //탭 열린 상태에서 초대장 받았을때는 지워야함. 초대장 로직
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    }
  }, []);
  const [showSplash, setShowSplash] = useState(isPWA()); // PWA 여부에 따라 초기 상태 설정

  useEffect(() => {
    if (isPWA() && showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false); // 5초 후 스플래시 화면 종료
      }, 1200);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [showSplash]);

  if (showSplash) {
    return <Splash />; // 스플래시 화면 렌더링
  }

  return (
    <Container>
      <Login />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7.5rem;
`;
