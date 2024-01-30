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
    if (localStorage.getItem("organization") !== "" || localStorage.getItem("challengeId") !== "") {
      localStorage.removeItem("organization");
      localStorage.removeItem("challengeId");
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
