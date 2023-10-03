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

export interface Customfield {
  id: number;
  name: string;
  internal_name?: any;
  field_format: string;
  value: string;
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
  value: string;
}

export interface Easyusertype {
  id: number;
  name: string;
}