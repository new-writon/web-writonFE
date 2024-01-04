/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

export const WRITON = axios.create({
  baseURL: "https://www.writon.store:443/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  responseType: "json",
});

interface APIResponse<T> {
  access_token: string;
  // 나중에 데이터 타입 여기서 다 맞춰야한다.
  code: number;
  message: string;
  data: T;
}

//TODO: GET 메서드
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await WRITON.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

//TODO: POST 메서드
export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await WRITON.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

//TODO: PUT 메서드
export const putData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await WRITON.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response = await WRITON.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
