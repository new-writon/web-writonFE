import { ChangeEvent, KeyboardEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { postLogin } from "@/apis/login";
import { AuthorizationTitle } from "@/components/atom/AuthorizationTitle";
import { BlueButton, KakaoButton } from "@/components/atom/button";
import Input from "@/components/atom/input";

import { Container, EtcBox, InputBox, OrLine } from "./style";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      LocalLogin();
    }
  };

  const LocalLogin = async () => {
    try {
      const response = await postLogin({ id, pw });
      console.log(response);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      navigate("/");
    } catch (err) {
      alert("아이디 및 비밀번호를 다시 입력해주세요"); // 모달창으로 변경하기
      console.log(err);
    }
  };

  const KakaoLogin = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_APP_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&response_type=code&lang=ko`;
    window.location.href = url;
  };

  return (
    <Container>
      <AuthorizationTitle>
        <p>로그인</p>
      </AuthorizationTitle>
      <InputBox>
        <Input
          type="text"
          value={id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
          placeholder="아이디"
        />
        <Input
          type="password"
          value={pw}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPw(e.target.value)}
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8~30자)"
          onKeyDown={handleOnKeyPress}
        />
      </InputBox>
      <BlueButton onClick={LocalLogin}>로그인</BlueButton>
      <OrLine>또는</OrLine>
      <KakaoButton onClick={KakaoLogin}>카카오로 로그인</KakaoButton>
      <EtcBox>
        <div className="findProp">
          <p className="notActive">아이디 찾기</p>
          <p>|</p>
          <p className="notActive">비밀번호 찾기</p>
        </div>
        <div className="notUser">
          <p>아직 회원이 아니신가요?</p>
          <p
            className="sign-up"
            onClick={() => navigate("/register")}
          >
            회원가입
          </p>
        </div>
      </EtcBox>
    </Container>
  );
};

export default Login;