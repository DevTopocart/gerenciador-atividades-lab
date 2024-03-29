import { Issues } from "../interfaces";

export function filterIssuesBySearchKey(searchkey: string, issue: Issues) {
  if (searchkey === "") return true;

  let containsSearchkey =
    issue.subject.toLowerCase().includes(searchkey.toLowerCase()) ||
    issue.project.name.toLowerCase().includes(searchkey.toLowerCase()) ||
    (issue.name_parent &&
      issue.name_parent.toLowerCase().includes(searchkey.toLowerCase())) ||
    issue.id.toString().includes(searchkey.toLowerCase());

  return containsSearchkey;
}
