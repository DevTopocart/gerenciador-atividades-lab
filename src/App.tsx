import { Route, Switch } from "react-router-dom";
import Atividades from "./pages/Atividades";
import LoginPage from "./pages/login";
import Theme from "./providers/Theme";
import "./styles.css";

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
