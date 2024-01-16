import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { postKakaoAuth, postKakaoLogin } from "@/apis/login";
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
      console.log(response);

      try {
        const res = await postKakaoLogin(
          response.access_token,
          localStorage.getItem("organization") || ""
        );
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        if (res.affiliatedConfirmation) {
          navigate("/");
        } else {
          navigate("/"); //나중에 온보딩 페이지로
        }
      } catch (err) {
        alert("다시 로그인해주세요"); // 모달창으로 변경하기
        console.log(err);
      }
    }
  };

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  return <Loading />;
};
