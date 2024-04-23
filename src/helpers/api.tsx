import axios, { AxiosRequestConfig } from "axios";
import Config from "./config";

const apiDefaultTimeout =
  (parseInt(import.meta.env.VITE_API_DEFAULT_TIMEOUT as string) || 60) * 1000;

export const getSession = async () => {
  const userToken = JSON.parse(window.localStorage.getItem("userToken") ?? "{}");
  console.log({userToken})
  return userToken ? {type: 'Bearer', token: userToken} : null;
};

const api = axios.create({
  baseURL: Config.SERVER_URL,
  timeout: apiDefaultTimeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config: any) => {
  const session = await getSession();

  // Create a copy of config to ensure types are correct and headers are not undefined
  const newConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: session ? `${session.type} ${session.token}` : '',
    }
  };

  console.log(JSON.stringify(newConfig))

  return newConfig as any; // This ensures the config object returned matches the expected AxiosRequestConfig type, including headers not being undefined
});

export default api;
