import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;

const baseUrl = envUrl
  ? envUrl.replace(/\/+$/, "")
  : "http://localhost:4000";

export const api = axios.create({
  baseURL: `${baseUrl}/api`,
});
