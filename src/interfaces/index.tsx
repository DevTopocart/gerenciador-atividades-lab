export interface LoginFormType {
  email: string;
  password: string;
}

export interface Issues {
  id: number;
  project: Project;
  tracker: Project;
  status: Status;
  css_classes: string;
  priority: Project;
  author: Project;
  assigned_to: Assignedto;
  parent?: Parent;
  subject: string;
  description: string;
  start_date?: string;
  due_date?: string;
  done_ratio: number;
  is_private: boolean;
  is_favorited: boolean;
  estimated_hours?: number;
  custom_fields?: Customfield[];
  created_on: string;
  updated_on: string;
  closed_on?: any;
  time: string;
  name_parent: string;
}

export interface Parent {
  id: number;
}

export interface Assignedto {
  id: number;
  name: string;
  avatar_urls: Avatarurls;
}

export interface Avatarurls {
  original: string;
  large: string;
  medium: string;
  small: string;
}

export interface Status {
  id: number;
  name: string;
  is_closed: boolean;
}

export interface Project {
  id: number;
  name: string;
}
export interface User {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  mail: string;
  phone: string;
  status: number;
  easy_system_flag: boolean;
  easy_lesser_admin: boolean;
  language: string;
  admin: boolean;
  easy_user_type: Easyusertype;
  custom_fields: Customfield[];
  last_login_on: string;
  passwd_changed_on: string;
  working_time_calendar: Workingtimecalendar;
  created_on: string;
  updated_on: string;
  supervisor?: Easyusertype;
  supervisor_user_id?: number;
}

export interface Workingtimecalendar {
  id: number;
  name: string;
  default_working_hours: number;
  time_from: string;
  time_to: string;
}

export interface Customfield {
  id: number;
  name: string;
  internal_name?: any;
  field_format: string;
  value: any;
}

export interface Easyusertype {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  easy_system_flag: boolean;
  created_on: string;
  custom_fields?: Customfield[];
}

export interface MinifiedUser {
  id: number;
  name: string;
}

export interface Timeentry {
  id: number;
  project: { id: number };
  issue: { id: number };
  user: { id: number };
  activity: { id: number };
  hours: number;
  comments: string;
  spent_on: string;
  easy_external_id?: any;
  entity_id: number;
  entity_type: string;
  created_on: string;
  updated_on: string;
  easy_is_billable: boolean;
  easy_billed: boolean;
  custom_fields: Customfield[];
}

export interface GithubRelease {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: GithubAuthor;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface GithubAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}