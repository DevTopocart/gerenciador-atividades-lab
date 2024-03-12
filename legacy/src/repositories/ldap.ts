import { http as Http } from "@tauri-apps/api";
import axios from "axios";
import axiosTauriApiAdapter from "axios-tauri-api-adapter";

/* fetch pelo Axios não estava funcionando na versão 0.19.0 da aplicação, então desabilitamos e passamos a utilizar o fetch nativo do Tauri, mas mantivemos o código aqui para manutenção futura */
const ldap = axios.create({
  adapter: axiosTauriApiAdapter,
  baseURL: "https://ldap.topocart.dev.br",
});

export default async function fetchLdap(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
) {
  const url = new URL(endpoint, "https://ldap.topocart.dev.br");

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? body : undefined,
  };

  try {
    const client = await Http.getClient();

    const response = await client.post(url.toString(), {
      payload: options.body,
      type: "Json",
    });

    return response;
  } catch (error) {
    console.error("Tauri Http.Fetch API error:", error);
    throw error;
  }
}
