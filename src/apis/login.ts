/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserInfo, kakaoType } from "@/types/user";

import { getData, postData } from ".";

// 로그인
export const postLogin = async ({
  id,
  pw,
  organization,
}: {
  id: string;
  pw: string;
  organization: string;
}) => {
  const response = await postData<UserInfo>("/auth/login/local", {
    identifier: id,
    password: pw,
    organization: organization,
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

export const postKakaoLogin = async (token: string, organization: string) => {
  const response = await postData<UserInfo>(
    "/auth/login/kakao",
    { organization: organization },
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
  const response = await getData(`/user/identifier/check?identifier=${userId}`);
  return response.data;
};

export const getDuplicateEmail = async (email: string) => {
  const response = await getData(`/user/email/check?email=${email}`);
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
