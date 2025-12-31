import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const signupAPI = (data) =>
  axios.post(`${BASE_URL}/auth/signup`, data);

export const loginAPI = (data) =>
  axios.post(`${BASE_URL}/auth/login`, data);

export const meAPI = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const logoutAPI = () => axios.post(`${BASE_URL}/auth/logout`);
