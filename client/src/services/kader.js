import { baseURL, apiURL } from "./baseURL";
import axios from "axios";

export const createKader = async (data) => {
  const endPoint = "user/kader";
  const res = await axios.post(`${baseURL}/${apiURL}/${endPoint}`, data);
  return res;
};

export const getKaders = async () => {
  const endPoint = "user";
  const res = await axios.get(`${baseURL}/${apiURL}/${endPoint}`);
  return res;
};
