import axios from "axios";

export const usgOrigin = "https://usg-api.onrender.com";
export const path = '/api/v1'
export const api = axios.create({
  baseURL: usgOrigin + path,
  withCredentials: true
});
