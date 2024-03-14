import { createRoot } from "react-dom/client";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Atividades from "./pages/Atividades";
import LoginPage from "./pages/Login";
import PainelGestor from "./pages/PainelGestor";
import Theme from "./providers/Theme";

const root = createRoot(document.body);

root.render(
  <HashRouter>
    <Theme>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/atividades/" exact>
          <Atividades />
        </Route>
        <Route path="/painel-gestor/">
          <PainelGestor />
        </Route>
        <Route path="*">
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </Theme>
    <ToastContainer />
  </HashRouter>,
);
