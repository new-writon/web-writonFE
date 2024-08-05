/* eslint-disable @typescript-eslint/no-explicit-any */
import { challengeListProps } from "@/types";
import { ErrorData } from "@/types/axios";
import { TokenInfo, UserInfo, kakaoType } from "@/types/user";

import { getData, postData } from ".";

// 로그인
export const postLogin = async (
  id: string,
  pw: string,
  organization: string,
  challengeId: number
) => {
  const response = await postData<UserInfo>("/auth/login/local", {
    identifier: id,
    password: pw,
    organization: organization,
    challengeId: challengeId,
  });
  return response.data;
};

export const postKakaoAuth = async (CODE: string) => {
  const response = await postData<kakaoType>(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
      import.meta.env.VITE_APP_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&code=${CODE}`,
    {}
  );
  return response.data;
};

export const postKakaoLogout = async (token: string) => {
  const response = await postData(
    `https://kapi.kakao.com/v1/user/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const postKakaoLogin = async (token: string, organization: string, challengeId: number) => {
  const response = await postData<UserInfo>(
    "/auth/login/kakao",
    { organization: organization, challengeId: challengeId },
    {
      headers: {
        Authentication: token,
      },
    }
  );
  return response.data;
};

//회원가입
export const getDuplicateId = async (userId: string) => {
  const response = await getData(`/auth/check/identifier?identifier=${userId}`);
  return response.data;
};

export const getDuplicateEmail = async (email: string) => {
  const response = await getData(`/auth/check/email?email=${email}`);
  return response;
};
export const postEmail = async (email: string) => {
  const response = await postData<{ code: number }>("/auth/generate/email-code", { email });
  return response;
};

export const postEmailCode = async (email: string, emailCode: string) => {
  const response = await postData("/auth/verify/email-code", {
    email: email,
    code: emailCode,
  });
  return response.data;
};

export const postRegister = async (id: string, pw: string, email: string) => {
  const response = await postData("/auth/signup", {
    identifier: id,
    password: pw,
    email: email,
  });
  return response.data;
};

export const getChallengingList = async () => {
  const response = await getData<challengeListProps[]>("/user/challenge");

  return response.data;
};

//토큰 관련
export const postRefreshToken = async () => {
  try {
    const response = await postData<TokenInfo>(
      "/auth/token-reissue",
      {},
      {
        headers: {
          refresh: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error as ErrorData;
  }
};
