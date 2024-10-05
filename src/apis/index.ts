/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { postRefreshToken } from "./login";

export const WRITON = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_DOMAIN,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  responseType: "json",
});

// 중복요청을 추적할 Set (버튼 두번 눌러서 중복된 요청을 방지)
const pendingRequests = new Set();
//request interceptor
WRITON.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (req.headers && accessToken) req.headers.Authorization = `${accessToken}`;
  // 요청을 식별하는 유니크 키 생성 (method, url, data 포함)
  const requestKey = `${req.method}-${req.url}`;

  // 동일한 요청이 이미 있는지 확인
  if (pendingRequests.has(requestKey)) {
    // 중복된 요청이면 요청 취소
    return Promise.reject("Duplicate request blocked");
  }

  // 요청을 pendingRequests에 추가
  pendingRequests.add(requestKey);

  return req;
});

let isRefreshing = false; // 리프레시 중 여부를 나타내는 플래그
let failedRequestsQueue: (() => Promise<any>)[] = []; // 실패한 요청을 저장하는 큐

// Custom event or callback to trigger state update
const notifyError = (message: string) => {
  const event = new CustomEvent("api-error", { detail: message });
  window.dispatchEvent(event);
};
// 에러 핸들링 함수
async function errorHandler(error: { config?: any; response?: any }) {
  const {
    config,
    response: {
      status,
      data: { message },
    },
  } = error;

  if (status === 401) {
    // 첫 번째 401 에러도 큐에 추가
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const originalRequest = new Promise((resolve, _reject) => {
      failedRequestsQueue.push(async () => resolve(WRITON(config)));
    });

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
        return Promise.reject(error);
      }
    } else {
      // 리프레시 중이면 실패한 요청을 큐에 추가
      return originalRequest;
    }
  } else if (status === 404) {
    // 토큰 재발급 api 에러 404는 이미 액세스토큰이 유효하다는 뜫
    failedRequestsQueue.forEach((request) => request());
    failedRequestsQueue = [];
    isRefreshing = false;
  } else if (status === 403) {
    // 로그인이 필요한 경우
    notifyError(message.message || message);
    // 로그인 페이지로 리다이렉트
    window.location.replace("/login");
  } else if (status === 429) {
    // 요청이 너무 많은 경우
    notifyError(message.message || message);
  } else if (
    status === 700 ||
    status === 701 ||
    status === 702 ||
    status === 600 ||
    status === 602 ||
    status === 900 ||
    status === 500
  ) {
    // 안에 데이터가 내부적으로 없는 경우
    return;
  } else if (status === 406) {
    // 이메일 중복
    alert(message.message || message);
    throw error;
  } else if (status === 422) {
    alert("내용을 적어주세요");
    throw error;
  } else if (status === 405) {
    //아이디 중복
    return;
  } else {
    // 그 외의 경우에는 에러 메시지를 알림창으로 표시
    notifyError(message.message || message);
  }
}

// 리스폰스 인터셉터
WRITON.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}-${response.config.url}`;
    pendingRequests.delete(requestKey);
    return response.data;
  },
  async (error: any) => {
    if (error.config) {
      const requestKey = `${error.config.method}-${error.config.url}`;
      pendingRequests.delete(requestKey);
    }
    return errorHandler(error);
  }
);

interface ApiResponse<T = any> {
  access_token?: string;
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
    throw new Error("서버 응답이 없습니다.");
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
    throw new Error("서버 응답이 없습니다.");
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
    throw new Error("서버 응답이 없습니다.");
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
    throw new Error("서버 응답이 없습니다.");
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
    throw new Error("서버 응답이 없습니다.");
  }
};
