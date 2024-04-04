/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, isAxiosError } from "axios";

import { ErrorData } from "@/types/axios";

export const WRITON = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_DOMAIN,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  responseType: "json",
});

WRITON.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (req.headers && accessToken) req.headers.Authentication = `${accessToken}`;
  return req;
});
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
