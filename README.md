# Gerenciador de Atividades da Topocart

Esta aplicação é construída com Electron + React + Typescript

[![pipeline](https://github.com/DevTopocart/gerenciador-atividades/actions/workflows/ci-cd.yml/badge.svg?branch=main)](https://github.com/DevTopocart/gerenciador-atividades/actions/workflows/ci-cd.yml)

## Para desenvolver

### Setup recomendado

- [VS Code](https://code.visualstudio.com/)


### Comandos para inicializar a aplicação em modo de desenvolvimento

`yarn && yarn start`

### Build & disponibilização em produção

A aplicação é disponibilizada automaticamente via pipeline na S3 e no FTP da Topocart.

O download da versão de produçao pode ser realizado através do [link](https://topocart.s3.amazonaws.com/gerenciador-de-atividades/gerenciador-atividades.msi) ou através da instalação via GPO nas máquinas da rede da Topocart
