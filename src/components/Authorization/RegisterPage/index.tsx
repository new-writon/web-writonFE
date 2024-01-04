import { useNavigate } from "react-router-dom";

import { AuthorizationTitle } from "@/components/atom/AuthorizationTitle";
import { BlueButton, KakaoButton } from "@/components/atom/button";

import { EtcBox, OrLine } from "../LoginPage/style"; // 공통속성인거 로그인 페이지 스타일 가져다씀

import { Container, RegisterBtns } from "./style";

const Register = () => {
  const navigate = useNavigate();
  const KakaoLogin = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_APP_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&response_type=code&lang=ko`;
    window.location.href = url;
  };
  return (
    <Container>
      <AuthorizationTitle>{""}</AuthorizationTitle>
      <RegisterBtns>
        <BlueButton onClick={() => navigate("/registeremail")}>이메일로 회원가입하기</BlueButton>
        <OrLine>또는</OrLine>
        <KakaoButton onClick={KakaoLogin}>카카오로 로그인</KakaoButton>
      </RegisterBtns>
      <EtcBox>
        <div className="notUser">
          <p>이미 회원이신가요?</p>
          <p
            className="sign-up"
            onClick={() => navigate("/login")}
          >
            로그인
          </p>
        </div>
      </EtcBox>
    </Container>
  );
};

export default Register;
