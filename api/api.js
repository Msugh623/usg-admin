import axios from "axios";

export const usgOrigin = "https://api.usgeaa-nigeria.org";
export const path = '/api/v1'
export const api = axios.create({
  baseURL: usgOrigin + path,
  withCredentials: true
});
