import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

axiosRequest.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    console.log("[LOG] | file: axios.ts:14 | error:", error);

    // Handle Error
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosRequest.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data: any) => axiosRequest.post<T>(url, data),
  put: <T>(url: string, data: any) => axiosRequest.put<T>(url, data),
  delete: <T>(url: string, data: any) =>
    axiosRequest.delete<T>(url, {
      data,
    }),
};
