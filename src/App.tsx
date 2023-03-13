import { useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import LoginPage from "./pages/login";
import ActivitiesPage from "./pages/activities/index"
import ActivitiesMinimizePage from "./pages/activities minimized";
import ConfirmationPage from "./pages/confirmation";
import { Switch, Route, BrowserRouter } from "react-router-dom";


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage email={""} password={""} />
        </Route>
        <Route exact path="/activities">
          <ActivitiesPage/>
        </Route>
        <Route exact path="/minimize">
          <ActivitiesMinimizePage/>
        </Route>
        <Route exact path="/confirmation">
          <ConfirmationPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
