import { IconType } from "react-icons";

export interface IconButtonPropsTypes {
    icon?: IconType;
    onClick: () => void;
    disabled?: boolean;
    background: string
  }
  
  export interface ButtonProps {
    disabledProp?: boolean;
  }