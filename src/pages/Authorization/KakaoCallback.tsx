import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { postChallengeStart } from "@/apis/OnboardingPage";
import { getChallengingList, postKakaoAuth, postKakaoLogin } from "@/apis/login";
import Loading from "@/components/Common/Loading";

export const KakaoCallback = () => {
  const CODE = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const kakaoLogin = async () => {
    if (!CODE) {
      throw new Error("No CODE");
    } else {
      const response = await postKakaoAuth(CODE);
      try {
        const res = await postKakaoLogin(
          response.access_token,
          localStorage.getItem("organization") || "null",
          Number(localStorage.getItem("challengeId")) || 1
        );
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("refreshToken", res.refreshToken);
        if (res.affiliatedConfirmation === true) {
          if (res.challengedConfirmation === true) {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            navigate("/");
          } else {
            try {
              await postChallengeStart(
                localStorage.getItem("organization") || "null",
                localStorage.getItem("challengeId") || "1"
              );
              localStorage.setItem("accessToken", res.accessToken);
              localStorage.setItem("refreshToken", res.refreshToken);
              navigate("/");
            } catch {
              new Error("shit");
            }
          }
        } else if (res.affiliatedConfirmation === false) {
          navigate("/onboarding"); //나중에 온보딩 페이지로
        } else {
          // null이 들어오면 listapi 요청 얘가 초대장으로 접속한 후, 재접속인지, 초대장 없이 그냥 라이톤 사이트 접속인지
          try {
            const data = await getChallengingList(); // 니중에 여기서 워크스페이스 만들어야함.
            if (data.length > 0) {
              localStorage.setItem("accessToken", res.accessToken);
              localStorage.setItem("refreshToken", res.refreshToken);
              localStorage.setItem("organization", data[0]?.organization);
              localStorage.setItem("challengeId", data[0]?.challenge_id.toString());
              navigate("/");
            } else {
              alert("초대장을 받고 들어와주세요!"); // 모달창으로 변경하기
              window.location.replace("/login");
            }
          } catch {
            new Error("shit");
          }
        }
      } catch (err) {
        alert("다시 로그인해주세요"); // 모달창으로 변경하기
        window.location.replace("/login");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  return <Loading />;
};
