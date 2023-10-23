import ldap from "../repositories/ldap";

export async function authLdap(username: string, password: string) {
    try {
        const response = await ldap.post(`/auth`, { username, password });
        return response
    } catch (error) {
        throw error
    }
}