import axios from "axios";
import { invoke } from "@tauri-apps/api";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

const api = axios.create({
  adapter: axiosTauriApiAdapter,
  baseURL: "https://39c4756f97.bigus-e1.easyproject.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: "d88f0ec1f38eabd194ce3058a970c53a98b539d5",
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
