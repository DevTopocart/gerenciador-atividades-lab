import axios from "axios";
import { invoke } from "@tauri-apps/api";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

const api = axios.create({
  adapter: axiosTauriApiAdapter,
  baseURL: "https://topocart.easyproject.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: "40258ec9f51a6fc2efcf5a861ef8f4d2ddf4b585",
  },
});

// api.interceptors.request.use(async (config: any) => {
//   try {
//     const response = await invoke("https", {
//       method: config.method,
//       url: config.url,
//       options: {
//         headers: config.headers,
//         data: config.data,
//         params: config.params,
//       },
//     });

//     return {
//       ...config,
//       data: response,
//       headers: {},
//       status: 200,
//       statusText: "OK",
//     };
//   } catch (error) {
//     return Promise.reject(error);
//   }
// });

export default api;
