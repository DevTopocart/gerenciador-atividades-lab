import ActiveDirectory from 'activedirectory2';


const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  const ad = new ActiveDirectory({
    url: 'ldap://bdc.topo.local',
    baseDN: 'dc=topo,dc=local',
    username: `${username}@topo.local`,
    password: password,
  });

  try {
    await ad.authenticate(username, password);
    return true;
  } catch (error) {
    console.error(`Error authenticating user ${username}: ${error}`);
    return false;
  }
};

export default authenticateUser;