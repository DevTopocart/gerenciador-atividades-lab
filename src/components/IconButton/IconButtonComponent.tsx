import React from "react";
import { IconButtonPropsTypes } from "./IconButtonPropTypes";

import {
    Button
} from "./styles"

const IconButtonComponent: React.FC<IconButtonPropsTypes> = ({
    icon: Icon,
    onClick,
    background,
    disabled,
}) => {
    const handleClick = () => {
        if (disabled) {
          return;
        }
        onClick();
      };

	return (
		<Button onClick={handleClick} disabledProp={disabled}>  
			{Icon && <Icon />}
		</Button>);
}


export default IconButtonComponent;