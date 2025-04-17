import axios from "axios";

export const usgOrigin = "http://159.198.79.144:3030";
export const path = '/api/v1'
export const api = axios.create({
  baseURL: usgOrigin + path,
  withCredentials: true
});
