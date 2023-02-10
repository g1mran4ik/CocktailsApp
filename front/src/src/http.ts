import axios from "axios";
import { API_BASE, OUTER_API_BASE } from "./constants/endpoints";

axios.interceptors.request.use((req) => {
  if (
    req &&
    req.headers &&
    (req.url?.includes("user-me") ||
      req.url?.includes("logout") ||
      req.url?.includes("like") ||
      req.url?.includes('dislike') ||
      req.url?.includes('favourite'))
  ) {
    req.headers.Authorization = `Token ${localStorage.getItem(
      "cocktailToken"
    )}`;
  }

  return req;
});

export const getOuter = (url: string) => axios.get(`${OUTER_API_BASE}${url}`);

export const get = (url: string) => axios.get(`${API_BASE}${url}`);

export const post = (url: string, data: any) =>
  axios.post(`${API_BASE}${url}`, data);
