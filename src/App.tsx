import { Route, Switch } from "react-router-dom";
import VersionChecker from "./components/VersionChecker";
import Atividades from "./pages/Atividades";
import PainelGestor from "./pages/PainelGestor";
import LoginPage from "./pages/login";
import Theme from "./providers/Theme";
import "./styles.css";

function App() {
  return (
    <Theme>
      <VersionChecker />
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/atividades/">
          <Atividades />
        </Route>
        <Route path="/painel-gestor/">
          <PainelGestor/>
        </Route>
      </Switch>
    </Theme>
  );
}

export default App;
