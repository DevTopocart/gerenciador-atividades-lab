import { useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import LoginPage from "./pages/login";
import ActivitiesPage from "./pages/activities/index"

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    // <div>
    //     <LoginPage email="teste@gmail.com" password="teste"/>
    // </div>
    <div>
      <ActivitiesPage/>
    </div>
  );
}

export default App;
