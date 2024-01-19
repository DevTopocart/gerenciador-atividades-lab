import { Issues } from "../interfaces";

export function filterIssuesByStatus(issue: Issues) {
    return issue.status.id === 3 || issue.status.id === 20;
  }