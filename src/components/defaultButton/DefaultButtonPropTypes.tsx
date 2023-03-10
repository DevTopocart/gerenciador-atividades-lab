import { IconType } from "react-icons";

export interface DefaultButtonPropTypes {
  label: string;
  icon?: IconType;
  onClick: () => void;
  disabled?: boolean;
}
