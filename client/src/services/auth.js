import { baseURL, apiURL } from "./baseURL";
import axios from "axios";

export const getToken = async () => {
  const endPoint = "user/token";
  const res = await axios.get(`${baseURL}/${apiURL}/${endPoint}`);
  return res;
};

export const login = async (data) => {
  const endPoint = "user/login";
  const res = await axios.post(`${baseURL}/${apiURL}/${endPoint}`, data);
  return res;
};

export const register = async (data) => {
  const endPoint = "user";
  const res = await axios.post(`${baseURL}/${apiURL}/${endPoint}`, data);
  return res;
};

export const logout = async () => {
  const endPoint = "user";
  const res = await axios.delete(`${baseURL}/${apiURL}/${endPoint}`);
  return res;
};
