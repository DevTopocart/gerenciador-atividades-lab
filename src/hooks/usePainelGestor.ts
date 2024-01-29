import { useState } from "react";
import { GroupsWithIssues, Issues, UsersWithIssues } from "../interfaces";
import { filterIssuesByStatus } from "../utils/filterIssuesByStatus";

export default function usePainelGestor() {
    const [groups,setGroups] = useState<GroupsWithIssues[] >();
    const [users,setUsers] = useState<UsersWithIssues[]>([]);

    let issuesFromGroups = groups ? groups?.filter(group => group.issues).map(group => group.issues).flat() : [] as Issues[]
    let issuesFromUsers = users ? users?.filter(user => user.issues).map(user => user.issues).flat() : [] as Issues[]

    let issues = [...issuesFromUsers,...issuesFromGroups]

    let uniqueIssues = ((issues && issues.length > 0) ? Array.from(
        issues!
          .reduce((map, item) => {
            return map.has(item!.id) ? map : map.set(item!.id, item);
          }, new Map())
          .values(),
      ) : []) as Issues[];

    let filteredIssues = uniqueIssues.filter(filterIssuesByStatus);

    
    let uniqueUsers = ((users && users.length > 0) ? Array.from(
        users!
          .reduce((map, item) => {
            return map.has(item.id) ? map : map.set(item.id, item);
          }, new Map())
          .values(),
      ) : []) as GroupsWithIssues[];

    let uniqueGroups = ((groups && groups.length > 0) ? Array.from(
        groups!
          .reduce((map, item) => {
            return map.has(item.id) ? map : map.set(item.id, item);
          }, new Map())
          .values(),
      ) : []) as GroupsWithIssues[];

    return {
        issues: filteredIssues,
        groups: uniqueGroups,
        setGroups,
        users: uniqueUsers,
        setUsers
    }
}