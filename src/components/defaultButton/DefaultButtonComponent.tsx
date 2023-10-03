import React from "react";

import { DefaultButtonPropTypes } from "./DefaultButtonPropTypes";
import { Button } from "./styles";

const DefaultButtonComponent: React.FC<DefaultButtonPropTypes> = ({
  icon: Icon,
  onClick,
  label,
  disabled,
  background,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} style={{ background }}>
      {Icon && <Icon />} {label}
    </Button>
  );
};

export default DefaultButtonComponent;
