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
      //const res = await postKakaoLogin(response.access_token);
      //console.log(res); // 여기서 토큰 받고 로컬스토리지에 저장
      navigate("/");
    }
  };

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  return <Loading />;
};
