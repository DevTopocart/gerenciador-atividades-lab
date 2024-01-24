# Gerenciador de Atividades da Topocart

Esta aplicação é construída com Tauri + React + Typescript

## Para desenvolver

### Setup recomendado

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Comando para instalar o Rust

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

### Comandos para inicializar a aplicação em modo de desenvolvimento

`yarn && yarn tauri dev`

### Build & disponibilização em produção

A aplicação é disponibilizada automaticamente via [![pipeline](https://github.com/DevTopocart/gerenciador-atividades/actions/workflows/ci-cd.yml/badge.svg?branch=main)](https://github.com/DevTopocart/gerenciador-atividades/actions/workflows/ci-cd.yml)

O download da versão de produçao pode ser realizado através do [link](https://topocart.s3.amazonaws.com/gerenciador-de-atividades/gerenciador-atividades.msi) ou através da instalação via GPO nas máquinas da rede da Topocart 
