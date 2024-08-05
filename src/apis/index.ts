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

  if (req.headers && accessToken) req.headers.Authorization = `${accessToken}`;
  return req;
});

let isRefreshing = false; // 리프레시 중 여부를 나타내는 플래그
let failedRequestsQueue: (() => Promise<any>)[] = []; // 실패한 요청을 저장하는 큐

// 에러 핸들링 함수
async function errorHandler(error: { message?: any; config?: any; response?: any }) {
  const {
    config,
    response: { status, data },
  } = error;

  if (status === 444) {
    // 만약 리프레시 중이 아니라면
    if (!isRefreshing) {
      isRefreshing = true; // 리프레시 중으로 플래그 설정
      try {
        const response = await postRefreshToken();
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        config.headers.Authentication = `${response.accessToken}`;

        // 실패한 요청을 다시 시도
        failedRequestsQueue.forEach((request) => request());
        failedRequestsQueue = [];
        isRefreshing = false; // 리프레시 완료 후 플래그 해제
        // alert("토큰이 갱신되었습니다.");
        return WRITON(config); // 갱신된 토큰을 가지고 다시 요청
      } catch (error) {
        // 리프레시 토큰 요청이 실패한 경우
        alert("토큰 갱신에 실패했습니다. 로그인 페이지로 이동합니다.");
        // 로그인 페이지로 리다이렉트
        window.location.replace("/login");
        return Promise.reject(error);
      }
    } else {
      // 리프레시 중이면 실패한 요청을 큐에 추가
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve, _reject) => {
        failedRequestsQueue.push(async () => resolve(WRITON(config)));
      });
    }
  } else if (status === 401) {
    // 로그인이 필요한 경우
    alert("재로그인이 필요합니다.");
    // 로그인 페이지로 리다이렉트
    window.location.replace("/login");
  } else if (status === 429) {
    // 요청이 너무 많은 경우
    alert("요청이 너무 많습니다. 잠시 후 다시 시도하세요.");
  } else if (status === 700 || status === 600) {
    // 요청이 너무 많은 경우
    return;
  } else {
    // 그 외의 경우에는 에러 메시지를 알림창으로 표시
    alert(data.message);
  }
}

// 리스폰스 인터셉터
WRITON.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: any) => {
    return errorHandler(error);
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
    // const res = await axios.get(
    //   `http://52.78.105.220:3001/api/user/challenge/present-situation/렛츠인턴/1`,
    //   {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJyb2xlIjoidXNlciIsImlhdCI6MTcyMjE4MjE5MSwiZXhwIjoxNzI0Nzc0MTkxfQ.6hcU7qH8zn1tkcDwd8vNFHwyvLnWkOfulg-EpcwBOz8`,
    //     },
    //   }
    // );
    // console.log(res);

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
    console.log(response);

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
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data as ErrorData;
    } else {
      // 서버 응답이 없는 경우 등의 에러 처리
      throw new Error("서버 응답이 없습니다.");
    }
  }
};
