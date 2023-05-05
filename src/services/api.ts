import axios from "axios";
import { IClientConfig, LdapClient } from "ldap-ts-client";
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

export async function ldapLogin(email: string, password: string): Promise<boolean> {
  const config: IClientConfig = {
    ldapServerUrl: "ldap://bdc.topo.local", 
    user: email,
    pass: password ,
    baseDN: "cn=Users,dc=topo,dc=local"
  };

  try {
    const client = new LdapClient(config);
    await client.bind();
    return true;
  } catch (error) {
    console.error(`Erro não foi encontrado o cliente`);
    return false;
  }
}