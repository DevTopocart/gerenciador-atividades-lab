import React from "react";

import { DefaultButtonPropTypes } from "./DefaultButtonPropTypes";
import { Button } from "./styles";

const DefaultButtonComponent: React.FC<DefaultButtonPropTypes> = ({
  icon: Icon,
  onClick,
  label,
  disabled,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {Icon && <Icon />} {label}
    </Button>
  );
};

export default DefaultButtonComponent;
