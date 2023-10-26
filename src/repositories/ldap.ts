import axios from "axios";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

const ldap = axios.create({
  adapter: axiosTauriApiAdapter,
  baseURL: "https://ldap.topocart.dev.br",
});

export default ldap;
