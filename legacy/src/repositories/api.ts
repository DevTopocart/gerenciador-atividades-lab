import axios from "axios";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

const api = axios.create({
  adapter: axiosTauriApiAdapter,
  baseURL: "https://topocart.easyredmine.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: "728afc1a01e2eb1762344b2cddca8ca7347aeb56",
  },
});

export default api;
