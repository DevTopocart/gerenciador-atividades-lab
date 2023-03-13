import React from "react";
import ActivitiesMinimizeComponent from "../../components/ActivitiesMinimized/ActivitiesMinimizedComponent";

const ActivitiesMinimizePage: React.FC = () =>{
	return(
		<div>
			<ActivitiesMinimizeComponent isConfirmation={false} title={"Atividade Atual"}></ActivitiesMinimizeComponent>
		</div>
	);
}

export default ActivitiesMinimizePage;