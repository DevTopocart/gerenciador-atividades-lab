import "./App.css";
import LoginPage from "./pages/login";
import ActivitiesPage from "./pages/activities/index"
import ActivitiesMinimizePage from "./pages/activities minimized";
import ConfirmationPage from "./pages/confirmation";
import { Switch, Route } from "react-router-dom";


function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage/>
      </Route>
      <Route path="/activities/">
        <ActivitiesPage/>  
      </Route>
      <Route path="/minimized/" component={ActivitiesMinimizePage}/>
      <Route path="/confirmation/" component={ConfirmationPage}/>
    </Switch>
  );
}

export default App;
