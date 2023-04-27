import "./App.css";
import LoginPage from "./pages/login";
import ActivitiesPage from "./pages/activities/index"
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
    </Switch>
  );
}

export default App;
