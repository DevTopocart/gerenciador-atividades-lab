import { Group, Issues, User } from "../interfaces";
import api from "../repositories/api";

export async function getUsers(
  page: number = 0,
  pageSize: number = 25,
  users: User[] = [],
): Promise<User[] | undefined> {
  try {
    const request = await api.get(`/users.json`, {
      params: {
        limit: pageSize,
        offset: page * pageSize,
      },
    });

    if (request.data.total_count > (page + 1) * pageSize) {
      users.push(...request.data.users);
      await getUsers(page + 1, pageSize, users);
    } else {
      users.push(...request.data.users);
    }

    return users;
  } catch (error) {
    console.error("Não foi possivel obter os usuários do Easy Project", error);
    throw error;
  }
}

export async function getGroups(
  page: number = 0,
  pageSize: number = 25,
  users: Group[] = [],
): Promise<Group[] | undefined> {
  try {
    const request = await api.get(`/groups.json`, {
      params: {
        limit: pageSize,
        offset: page * pageSize,
      },
    });

    if (request.data.total_count > (page + 1) * pageSize) {
      users.push(...request.data.groups);
      await getGroups(page + 1, pageSize, users);
    } else {
      users.push(...request.data.groups);
    }

    return users;
  } catch (error) {
    console.error("Não foi possivel obter os grupos do Easy Project", error);
    throw error;
  }
}

export async function getIssues(id_user: number) {
  try {
    const response = await api.get("/issues.json", {
      params: {
        assigned_to_id: id_user,
      },
    });

    const issues: Issues[] = response.data.issues;

    for (let i = 0; i < issues.length; i++) {
      const responseTimeIssues = await api.get("/time_entries.json", {
        params: {
          set_filter: true,
          issue_id: issues[i].id,
          user_id: issues[i].assigned_to.id,
        },
      });
      const id_parent = issues[i].parent;
      if (id_parent) {
        const responseIssues = await api.get(`/issues/${id_parent.id}.json`);
        issues[i].name_parent = responseIssues.data.issue.subject;
      } else {
        issues[i].name_parent = "-";
      }
    }

    return issues;
  } catch (error) {
    throw error;
  }
}

export async function getAllIssues(
  page: number = 0,
  pageSize: number = 100,
  issues: Issues[] = [],
): Promise<Issues[] | undefined> {
  try {
    const request = await api.get(`/issues.json`, {
      params: {
        limit: pageSize,
        offset: page * pageSize,
      },
    });

    if (request.data.total_count > (page + 1) * pageSize) {
      issues.push(...request.data.issues);
      await getAllIssues(page + 1, pageSize, issues);
    } else {
      issues.push(...request.data.issues);
    }

    return issues;
  } catch (error) {
    console.error("Não foi possivel obter as issues do Easy Project", error);
    throw error;
  }
}

export async function setCurrentActivityForGroup(
  id_group: number,
  id_activity: number,
) {
  try {
    await api.put(`/groups/${id_group}.json`, {
      group: {
        id: id_group,
        custom_fields: [
          {
            // 125 é o ID do campo customizado "Tarefa Atual"
            id: 125,
            name: "Tarefa Atual",
            value: id_activity,
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentActivityForGroup(id_group: number) {
  try {
    const group: Group = (await api.get(`/groups/${id_group}.json`)).data.group;

    if (!group || !group.custom_fields) return;

    const activity: Issues = (
      await api.get(
        `/issues/${group.custom_fields?.find((e) => e.id === 125)?.value}.json`,
      )
    ).data.issue;

    return activity;
  } catch (error) {
    console.error(error);
  }
}

export async function createTimeEntryForGroup(
  id_group: number,
  id_project: number,
  id_issue: number,
  spentOn: string,
  hours: string,
) {
  try {
    const time_json = {
      time_entry: {
        project_id: id_project,
        issue_id: id_issue,
        user_id: 100,
        hours: hours,
        spent_on: spentOn,
        comments: "Atividade lançada pelo apontador de horas",
        custom_fields: [
          {
            id: 106,
            value: id_group,
          },
        ],
      },
    };

    const response = await api.post(`/time_entries.json`, time_json);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createTimeEntryForUser(
  id_user: number,
  id_project: number,
  id_issue: number,
  spentOn: string,
  hours: string,
) {
  try {
    const time_json = {
      time_entry: {
        project_id: id_project,
        issue_id: id_issue,
        user_id: id_user,
        hours: hours,
        spent_on: spentOn,
        comments: "Atividade lançada pelo apontador de horas",
      },
    };

    const response = await api.post(`/time_entries.json`, time_json);
    return response;
  } catch (error) {
    console.error(error);
  }
}
