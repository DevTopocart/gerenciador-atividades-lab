import axios from "axios";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

const api = axios.create({
  adapter: axiosTauriApiAdapter,
  baseURL: "https://topocart.easyredmine.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: "a9260e03ecd57a3cec7b7cffa3dce43561febc16",
  },
});

export default api;