import { Group, Issues, User } from "../interfaces";
import api from "../repositories/api";
import { filter2ndElementFrom3PartsArray } from "../utils/filter2ndElementFrom3PartsArray";

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

export async function getUser(id: number): Promise<User | undefined> {
  try {
    const response = await api.get(`/users/${id}.json`);
    return response.data.user;
  } catch (error) {
    console.error("Não foi possivel obter o usuário do Easy Project", error);
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

export async function getGroup(id: number): Promise<Group | undefined> {
  try {
    const response = await api.get(`/groups/${id}.json`);
    return response.data.group;
  } catch (error) {
    console.error("Não foi possivel obter o grupo do Easy Project", error);
    throw error;
  }
}

export async function getIssues(
  id_user: number,
  page: number = 0,
  pageSize: number = 25,
  issues: Issues[] = [],
): Promise<Issues[]> {
  try {
    const request = await api.get(`/issues.json`, {
      params: {
        limit: pageSize,
        offset: page * pageSize,
        set_filter: true,
        query_string: `watcher_id = ${id_user} OR assigned_to_id = ${id_user} AND (status_id = 3 OR status_id = 20)`,
      },
    });

    let issuesToGetParents: Issues[] = request.data.issues;

    let issuesWithParents = await Promise.all(
      issuesToGetParents.map(async (issue) => {
        const id_parent = issue.parent;
        if (id_parent) {
          const responseIssues = await api.get(`/issues/${id_parent.id}.json`);
          issue.name_parent = responseIssues.data.issue.subject;
          return issue;
        } else {
          issue.name_parent = undefined;
          return issue;
        }
      }),
    );

    if (request.data.total_count > (page + 1) * pageSize) {
      issues.push(...issuesWithParents);
      await getIssues(id_user, page + 1, pageSize, issues);
    } else {
      issues.push(...issuesWithParents);
    }

    return issues;
  } catch (error) {
    console.error("Não foi possivel obter os usuários do Easy Project", error);
    throw error;
  }
}

export async function getAllIssuesFromSubordinates(
  subordinatesIds: number[],
  page: number = 0,
  pageSize: number = 100,
  issues: Issues[] = [],
  issuesIds?: number[],
): Promise<Issues[] | undefined> {
  try {
    const request = await api.get(`/issues.json`, {
      params: {
        limit: pageSize,
        offset: page * pageSize,
        set_filter: true,
        query_string: `watcher_id = ${
          "[" + subordinatesIds.map((e) => String(e)).join(",") + "]"
        } OR assigned_to_id = ${
          "[" + subordinatesIds.map((e) => String(e)).join(",") + "]"
        } ${issuesIds?.map((e) => `OR issue_id = ${e}`).join(" ") ?? ""}`,
      },
    });

    if (request.data.total_count > (page + 1) * pageSize) {
      issues.push(...request.data.issues);
      await getAllIssuesFromSubordinates(
        subordinatesIds,
        page + 1,
        pageSize,
        issues,
      );
    } else {
      issues.push(...request.data.issues);
    }

    return issues;
  } catch (error) {
    console.error("Não foi possivel obter as issues do Easy Project", error);
    throw error;
  }
}

export async function removeIssueFromGroup(group_id: number, issue_id: number) {
  try {
    let group = (await api.get(`/groups/${group_id}.json`)).data.group as Group;

    let workedIssues = group.custom_fields?.find((e) => e.id === 130)
      ?.value as (number | string)[];

    const issueIdToRemove = issue_id;
    const indexToRemove = workedIssues.indexOf(issueIdToRemove);

    if (indexToRemove !== -1) {
      workedIssues.splice(indexToRemove - 1, 3);
    }

    await api.put(`/groups/${group_id}.json`, {
      group: {
        id: group_id,
        custom_fields: [
          {
            id: 130,
            value: workedIssues,
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addIssueToGroup(group_id: number, issue_id: number) {
  try {
    let group = (await api.get(`/groups/${group_id}.json`)).data.group as Group;

    let workedIssues = group.custom_fields?.find((e) => e.id === 130)
      ?.value as (number | string)[];

    await api.put(`/groups/${group_id}.json`, {
      group: {
        id: group_id,
        custom_fields: [
          {
            id: 130,
            value: [...workedIssues, issue_id],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTimeEntryForGroup(
  id_group: number,
  id_project: number,
  id_issue: number,
  spentOn: string,
  hours: string,
  startTime: Date,
  endTime: Date,
) {
  try {
    const time_json = {
      time_entry: {
        project_id: id_project,
        issue_id: id_issue,
        user_id: 92,
        hours: hours,
        spent_on: spentOn,
        "easy_time_from": startTime.toISOString(),
        "easy_time_to": endTime.toISOString(),
        comments:
          "Atividade lançada pelo Gerenciador de Atividades em nome de outro colaborador",
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
    throw error;
  }
}

export async function createTimeEntryForUser(
  id_user: number,
  id_project: number,
  id_issue: number,
  spentOn: string,
  hours: string,
  startTime: Date,
  endTime: Date,
) {
  try {
    const time_json = {
      time_entry: {
        project_id: id_project,
        issue_id: id_issue,
        user_id: id_user,
        hours: hours,
        "easy_time_from": startTime.toISOString(),
        "easy_time_to": endTime.toISOString(),
        spent_on: spentOn,
        comments: "Atividade lançada pelo Gerenciador de Atividades",
      },
    };

    const response = await api.post(`/time_entries.json`, time_json);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateStatusActivity(
  id_issue: number,
  id_status: number,
) {
  try {
    const response = await api.put(`/issues/${id_issue}.json`, {
      issue: {
        id: id_issue,
        status_id: id_status,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getIssuesFromGroupUser(
  id_group: number,
  id_supervisor: number,
) {
  try {
    const issues = await getIssues(id_supervisor);

    for (let i = 0; i < issues.length; i++) {
      const id_parent = issues[i].parent;
      if (id_parent) {
        const responseIssues = await api.get(`/issues/${id_parent.id}.json`);
        issues[i].name_parent = responseIssues.data.issue.subject;
      } else {
        issues[i].name_parent = undefined;
      }
    }

    const groupUser = (await api.get(`/groups/${id_group}.json`)).data
      .group as Group;

    let issuesIdsFromGroupUser = filter2ndElementFrom3PartsArray(
      groupUser.custom_fields?.find((e) => e.id === 130)?.value as (
        | number
        | string
      )[],
    );

    let issuesFromGroupUser = issues.filter((e) =>
      issuesIdsFromGroupUser.includes(e.id),
    );

    return issuesFromGroupUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
