import { baseURL, apiURL } from "../baseURL";
import axios from "axios";

export const getHome = async () => {
  const endPoint = "dashboard/home";
  const res = await axios.get(`${baseURL}/${apiURL}/${endPoint}`);
  return res;
};
