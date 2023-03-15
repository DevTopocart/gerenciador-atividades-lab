// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::SystemTray;
use tauri::Manager;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    
    let openApp = CustomMenuItem::new("abrir".to_string(), "Abrir tela de atividades");
    let closeApp = CustomMenuItem::new("minimizar".to_string(), "Minimizar tela de atividades");
    let quit = CustomMenuItem::new("sair".to_string(), "Fechar o gerenciador de atividades");
    let tray_menu = SystemTrayMenu::new()
        .add_item(openApp)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(closeApp)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    
    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()    
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
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
