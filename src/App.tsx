import { Route, Switch } from "react-router-dom";
import "./App.css";
import Atividades from "./pages/Atividades";
import LoginPage from "./pages/login";
import Theme from "./providers/Theme";

function App() {
  return (
    <Theme>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/atividades/">
          <Atividades />
        </Route>
      </Switch>
    </Theme>
  );
}

export default App;
