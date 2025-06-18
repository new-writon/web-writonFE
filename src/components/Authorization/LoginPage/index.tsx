import { ChangeEvent, KeyboardEvent, useState, useCallback } from "react";

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

  // 토큰 저장 함수
  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  };
  const LocalLogin = useCallback(async () => {
    executeAsyncTask(async () => {
      try {
        const response = await postLogin(
          id,
          pw,
          localStorage.getItem("organization") || "null",
          Number(localStorage.getItem("challengeId")) || 1
        );

        saveTokens(response.accessToken, response.refreshToken);

        // 라이톤 온보딩이 필요한 경우
        if (response.writonAffiliatedConfirmation === false) {
          // 초대장으로 들어온 경우와 일반 진입을 구분
          const isFromInvitation =
            localStorage.getItem("organization") !== null &&
            localStorage.getItem("challengeId") !== null;

          if (isFromInvitation) {
            // 초대장으로 들어온 경우, 현재 organization 정보 저장
            localStorage.setItem("nextOrganization", localStorage.getItem("organization") || "");
            localStorage.setItem("nextChallengeId", localStorage.getItem("challengeId") || "");
          }

          // 라이톤 온보딩을 위한 설정
          localStorage.setItem("organization", "라이톤");
          localStorage.setItem("challengeId", response.challengeId.toString());

          navigate("/onboarding");
          return;
        }

        if (response.affiliatedConfirmation === true) {
          if (response.challengedConfirmation === true) {
            navigate("/");
          } else {
            try {
              await postChallengeStart(
                localStorage.getItem("organization") || "null",
                localStorage.getItem("challengeId") || "1"
              );
              navigate("/");
            } catch (err) {
              console.error("챌린지 시작 실패", err);
              alert("챌린지 시작 중 문제가 발생했습니다.");
              window.location.replace("/login");
            }
          }
        } else if (response.affiliatedConfirmation === false) {
          navigate("/onboarding");
        } else {
          try {
            const data = await getChallengingList();
            if (data.length > 0) {
              localStorage.setItem("organization", data[0]?.organization);
              localStorage.setItem("challengeId", data[0]?.challengeId.toString());
              navigate("/");
            } else {
              alert("초대장을 받고 들어와주세요!");
            }
          } catch (err) {
            console.error("챌린지 리스트 조회 실패", err);
            alert("사용자 정보 확인 중 문제가 발생했습니다.");
            window.location.replace("/login");
          }
        }
      } catch (err) {
        alert("아이디와 비밀번호를 확인해주세요.");
        console.error("로컬 로그인 실패", err);
        window.location.replace("/login");
      }
    });
  }, [id, pw, navigate, executeAsyncTask]);

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
