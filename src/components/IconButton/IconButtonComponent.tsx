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
	return (
		<Button onClick={onClick} >  
			{Icon && <Icon />}
		</Button>);
}


export default IconButtonComponent;