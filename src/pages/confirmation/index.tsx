import React from "react";
import ActivitiesMinimizeComponent from "../../components/ActivitiesMinimized/ActivitiesMinimizedComponent";

const ConfirmationPage: React.FC = () =>{
    return(
		<div>
			<ActivitiesMinimizeComponent isConfirmation={true} title={"Você ainda está nesta tarefa?"}></ActivitiesMinimizeComponent>
		</div>
);
}

export default ConfirmationPage;