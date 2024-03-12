import { invoke } from "@tauri-apps/api/tauri";

window.__TAURI_IPC__ = {
  invoke: async (command, args) => {
    return invoke(command, args);
  },
};
