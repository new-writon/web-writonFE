import { ChangeEvent, KeyboardEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { postChallengeStart } from "@/apis/OnboardingPage";
import { getChallengingList, postLogin } from "@/apis/login";
import { AuthorizationTitle } from "@/components/atom/AuthorizationTitle";
import { BlueButton, KakaoButton } from "@/components/atom/button";
import { Input } from "@/components/atom/input";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";

import { Container, EtcBox, InputBox, OrLine } from "./style";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const executeAsyncTask = useAsyncWithLoading();

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      LocalLogin();
    }
  };

  const LocalLogin = async () => {
    executeAsyncTask(async () => {
      try {
        const response = await postLogin(
          id,
          pw,
          localStorage.getItem("organization") || "null",
          Number(localStorage.getItem("challengeId")) || 1
        );
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("refreshToken", response.refreshToken);
        if (response.affiliatedConfirmation === true) {
          if (response.challengedConfirmation === true) {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            navigate("/");
          } else {
            try {
              await postChallengeStart(
                localStorage.getItem("organization") || "null",
                localStorage.getItem("challengeId") || "1"
              );
              localStorage.setItem("accessToken", response.accessToken);
              localStorage.setItem("refreshToken", response.refreshToken);
              navigate("/");
            } catch {
              new Error("shit");
            }
          }
        } else if (response.affiliatedConfirmation === false) {
          navigate("/onboarding"); //나중에 온보딩 페이지로
        } else {
          // null이 들어오면 listapi 요청 얘가 초대장으로 접속한 후, 재접속인지, 초대장 없이 그냥 라이톤 사이트 접속인지
          try {
            const data = await getChallengingList(); // 니중에 여기서 워크스페이스 만들어야함.
            if (data.length > 0) {
              localStorage.setItem("accessToken", response.accessToken);
              localStorage.setItem("refreshToken", response.refreshToken);
              localStorage.setItem("organization", data[0]?.organization);
              localStorage.setItem("challengeId", data[0]?.challenge_id.toString());
              navigate("/");
            } else {
              alert("초대장을 받고 들어와주세요!"); // 모달창으로 변경하기
            }
          } catch {
            new Error("shit");
          }
        }
      } catch (err) {
        alert("아이디 및 비밀번호를 다시 입력해주세요"); // 모달창으로 변경하기
        window.location.replace("/login");
        console.log(err);
      }
    });
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
      <KakaoButton onClick={KakaoLogin}>카카오 로그인</KakaoButton>
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
