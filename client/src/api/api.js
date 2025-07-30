import axios from "axios";

const BASE_URL = "https://sachinkathar.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
