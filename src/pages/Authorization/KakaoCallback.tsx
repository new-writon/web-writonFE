import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postChallengeStart } from "@/apis/OnboardingPage";
import { getChallengingList, postKakaoAuth, postKakaoLogin } from "@/apis/login";
import Loading from "@/components/Common/Loading";

const KakaoCallback = () => {
  const CODE = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  // 토큰 저장 함수
  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  };

  const kakaoLogin = useCallback(async () => {
    try {
      if (!CODE) {
        throw new Error("No CODE");
      }

      const response = await postKakaoAuth(CODE);
      const res = await postKakaoLogin(
        response.access_token,
        localStorage.getItem("organization") || "null",
        Number(localStorage.getItem("challengeId")) || 1
      );

      saveTokens(res.accessToken, res.refreshToken);

      // 라이톤 온보딩이 필요한 경우
      if (res.writonAffiliatedConfirmation === false) {
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
        localStorage.setItem("challengeId", res.challengeId.toString());

        navigate("/onboarding");
        return;
      }

      if (res.affiliatedConfirmation === true) {
        if (res.challengedConfirmation === true) {
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
      } else if (res.affiliatedConfirmation === false) {
        navigate("/onboarding");
      } else {
        try {
          const data = await getChallengingList(); // 내부에서 organization이랑, challengeId 저장해줌.
          if (data.length > 0) {
            localStorage.setItem("organization", data[0]?.organization);
            localStorage.setItem("challengeId", data[0]?.challengeId.toString());
            navigate("/");
          } else {
            alert("초대장을 받고 들어와주세요!");
            window.location.replace("/login");
          }
        } catch (err) {
          console.error("챌린지 리스트 조회 실패", err);
          alert("사용자 정보 확인 중 문제가 발생했습니다.");
          window.location.replace("/login");
        }
      }
    } catch (err) {
      console.error("예상치 못한 오류", err);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      window.location.replace("/login");
    }
  }, [CODE, navigate]);

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  return <Loading />;
};

export default KakaoCallback;
