import axios from "axios";
const getApiUrl = () => {
  const environment = import.meta.env.VITE_ENVIRONMENT || "production";

  console.log("Environment:", environment);

  switch (environment) {
    case "production":
      return "https://usgeaa-nigeria.online";
    case "staging":
      return "https://staging.usgeaa-nigeria.online";
    case "development":
    default:
      return "http://localhost:3030";
  }
};

export const usgOrigin = getApiUrl();
export const path = import.meta.env.VITE_API_PATH || "/api/v1";

// export const usgOrigin = "https://usgeaa-nigeria.online";
// export const path = '/api/v1'
export const api = axios.create({
  baseURL: usgOrigin + path,
  withCredentials: true
});
