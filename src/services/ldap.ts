import fetchLdap from "../repositories/ldap";

export async function authLdap(username: string, password: string) {
  try {
    const response = await fetchLdap('/auth', 'POST', { username, password });

    return response;
  } catch (error) {
    throw error;
  }
}
