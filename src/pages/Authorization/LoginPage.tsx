import { useEffect } from "react";

import styled from "styled-components";

import Login from "@/components/Authorization/LoginPage";

const LoginPage = () => {
  useEffect(() => {
    // 페이지 로드 시 실행되는 코드
    const organization = new URL(window.location.href).searchParams.get("organization");
    const challengeId = new URL(window.location.href).searchParams.get("challengeId");
    if (organization && challengeId) {
      localStorage.setItem("organization", organization);
      localStorage.setItem("challengeId", challengeId);
    }
    if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
      //탭 열린 상태에서 초대장 받았을때는 지워야함. 초대장 로직
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    }
  }, []);
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
