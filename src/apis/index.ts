/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, isAxiosError } from "axios";

import { ErrorData } from "@/types/axios";

import { postRefreshToken } from "./login";

export const WRITON = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_DOMAIN,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  responseType: "json",
});

//request interceptor
WRITON.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (req.headers && accessToken) req.headers.Authentication = `${accessToken}`;
  return req;
});

//response interceptor
WRITON.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;
    if (status === 444) {
      const originRequest = config;
      //리프레시 토큰 api
      try {
        const response = await postRefreshToken();
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        originRequest.headers.Authentication = `${response.accessToken}`;
        //진행중이던 요청 이어서하기
        return axios(originRequest);
      } catch (error) {
        const err = error as ErrorData;
        if (err.code === 401) {
          alert("재로그인!");
          localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/login");
        }
      }
    } else if (status === 401) {
      alert("재로그인");
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace("/login");
    } else if (status === 429) {
      alert("너무 많은 요청을 하셨습니다. 로그아웃");
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace("/login");
    } else {
      console.log(data);
      alert(data.message);
    }
  }
);

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

//TODO: GET 메서드
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await WRITON.get(url, config);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data as ErrorData;
    } else {
      // 서버 응답이 없는 경우 등의 에러 처리
      throw new Error("서버 응답이 없습니다.");
    }
  }
};

//TODO: POST 메서드
export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await WRITON.post(url, data, config);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data as ErrorData;
    } else {
      // 서버 응답이 없는 경우 등의 에러 처리
      throw new Error("서버 응답이 없습니다.");
    }
  }
};

//TODO: PUT 메서드
export const putData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await WRITON.put(url, data, config);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data as ErrorData;
    } else {
      // 서버 응답이 없는 경우 등의 에러 처리
      throw new Error("서버 응답이 없습니다.");
    }
  }
};

//TODO: PATCH 메서드
export const patchData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await WRITON.patch(url, data, config);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data as ErrorData;
    } else {
      // 서버 응답이 없는 경우 등의 에러 처리
      throw new Error("서버 응답이 없습니다.");
    }
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await WRITON.delete(url, config);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data as ErrorData;
    } else {
      // 서버 응답이 없는 경우 등의 에러 처리
      throw new Error("서버 응답이 없습니다.");
    }
  }
};
