export interface ActivitiesTaskPropsType {
    hours: string;
    title: string;
    nameProject: string;
    projectDepartment: string;
    index: number;
    isSelected?: boolean;
    onSelect: (index: number) => void;
  }
  