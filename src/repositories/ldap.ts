import axios from "axios";

export const ldap = axios.create({
  baseURL: "https://ldap.topocart.dev.br",
});
