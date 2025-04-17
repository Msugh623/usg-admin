import axios from "axios";

export const usgOrigin = "https://usgeaa-nigeria.online";
export const path = '/api/v1'
export const api = axios.create({
  baseURL: usgOrigin + path,
  withCredentials: true
});
