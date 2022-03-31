import { baseURL, apiURL } from "./baseURL";
import axios from "axios";

export const getPregnants = async ({ role, idKader }) => {
  const endPoint = "pregnant";
  if (role === "Kader") {
    const res = await axios.get(
      `${baseURL}/${apiURL}/pregnant/kader/${idKader}`
    );
    return res;
  } else {
    const res = await axios.get(`${baseURL}/${apiURL}/${endPoint}`);
    return res;
  }
};

export const createPregnant = async (data) => {
  const endPoint = "pregnant";
  const res = await axios.post(`${baseURL}/${apiURL}/${endPoint}`, data);
  return res;
};

export const getDetailPregnant = async (id) => {
  const endPoint = `pregnant/${id}`;
  const res = await axios.get(`${baseURL}/${apiURL}/${endPoint}`);
  return res;
};

export const createCekup = async (id, data) => {
  const endPoint = `pregnant/cekup/${id}`;
  const res = await axios.patch(`${baseURL}/${apiURL}/${endPoint}`, data);
  return res;
};
