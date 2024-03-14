import { ldap } from "../repositories/ldap";

export async function authLdap(username: string, password: string) {
  return await ldap.post("/auth", { username, password });
}
