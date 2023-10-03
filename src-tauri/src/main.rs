// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::SystemTray;
use tauri::Manager;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet() {
  println!("I was invoked from JS, with this message:");
}

#[tauri::command]
fn popup_window(window: tauri::Window) {
  println!("Maximizing window!");
  window.show().unwrap();
  window.unminimize().unwrap();
  println!("Window maximized!");
}

fn main() {
    
    let open_app = CustomMenuItem::new("abrir".to_string(), "Abrir tela de atividades");
    let close_app = CustomMenuItem::new("minimizar".to_string(), "Minimizar tela de atividades");
    let quit = CustomMenuItem::new("sair".to_string(), "Fechar o gerenciador de atividades");
    let tray_menu = SystemTrayMenu::new()
        .add_item(open_app)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(close_app)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    
    let tray = SystemTray::new().with_menu(tray_menu);

    let _app = tauri::Builder::default()    
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
              position: _,
              size: _,
              ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
              position: _,
              size: _,
              ..
            } => {
              println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
              position: _,
              size: _,
              ..
            } => {
              println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
              match id.as_str() {
                "sair" => {
                  std::process::exit(0);
                }
                "abrir" => {
                  let window = app.get_window("main").unwrap();
                  window.show().unwrap();
                }                
                "minimizar" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                  }
                _ => {}
              }
            }
            _ => {}
          })
        .invoke_handler(tauri::generate_handler![greet,popup_window])
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                // don't kill the app when the user clicks close. this is important
                event.window().hide().unwrap();
                api.prevent_close();
            }
            tauri::WindowEvent::Focused(false) => {
                // hide the window automaticall when the user
                // clicks out. this is for a matter of taste.
                // event.window().hide().unwrap();
                println!("user clicou fora da janela principal");
            }
            _ => {}
        })
        .run(tauri::generate_context!())        
        .expect("error while running tauri application");
      
}
