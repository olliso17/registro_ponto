## Installation

```bash
$ npm install
```

## Running the api

```bash
# development
$ npm start-dev

# build
$ npm run build
```
## docker

```bash
#run docker
$ docker-compose up -d
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run coverage
```

## Support

# Endpoints
## URL de produção pela vercel
```bash
    URL: (https://registro-ponto-back.vercel.app/api)
```
##  Criar Funcionário
```bash

    URL: (https://registro-ponto-back.vercel.app/api/employee/create)
    Método: POST
    Descrição: Cria um novo registro de funcionário com os dados fornecidos.
    Corpo da Requisição: Deve conter os dados do funcionário a serem criados.
    Resposta de Sucesso: Retorna o novo funcionário criado.
    Resposta de Erro: Retorna uma mensagem de erro se a criação do funcionário falhar.
```
##  Acessa o sistema pela hash
```bash
    URL: (https://registro-ponto-back.vercel.app/api/employee/login)
    Método: POST
    Descrição: Acessa o sistema.
    Resposta de Sucesso: Retorna a pagina home.
    Resposta de Erro: Retorna uma mensagem de erro e retorna ao incio.
```
##  Obter Funcionário pelo id
```bash
    URL: (https://registro-ponto-back.vercel.app/api/employee/:id)
    Método: GET
    Descrição: retorna um funcionário
    Resposta de Erro: Retorna uma mensagem de erro e retorna ao incio.
```
##  Obter As horas trabalhadas
```bash
    URL: (https://registro-ponto-back.vercel.app/api/workedHours/create)
    Método: GET
    Descrição: Retorna os dados de um funcionário que se encontra no trabalho ou saindo dele.
    Parâmetros de URL: id do funcionario e do tipo, mais opcional hours_worked.
    Resposta de Sucesso: Retorna os dados do worked.
    Resposta de Erro: Retorna uma mensagem de erro se a busca do funcionário falhar.
```
## Editar Pega todas as horas trabalhadas desse funcionario
```bash
    URL: (https://registro-ponto-back.vercel.app/api/workedHours/:employee_id)
    Método: PUT
    Descrição: Retorna os dados de um funcionário e suas horas trabalhadas.
    Resposta de Erro: Retorna uma mensagem de erro se a edição do funcionário falhar.
```
## Pega todos os typos
```bash
    URL: (https://registro-ponto-back.vercel.app/api/type/)
    Método: GET
    Descrição: Pega todos os tipos
    Resposta de Sucesso: Retorna  os tipos.
    Resposta de Erro: Retorna uma mensagem de erro se a exclusão do funcionário falhar.
```
## Cria os tipos sem passar dados no body
```bash
    URL: (https://registro-ponto-back.vercel.app/api/type/create)
    Método: POST
    Descrição: Carrega os tipos no banco
    Resposta de Sucesso: Retorna  os tipos.
    Resposta de Erro: Retorna uma mensagem de erro se a exclusão do funcionário falhar.
```
## Pega todas as datas trabalhadas pela data atual
```bash
    URL: (https://registro-ponto-back.vercel.app/api/workedHours/created/:employee_id)
    Método: GET
    Descrição: Pega todas as horas trabalhadas do dia atual
    Resposta de Sucesso: Retorna  horas trabalhadas do dia atual
    Resposta de Erro: Retorna uma mensagem de erro se a exclusão do funcionário falhar.
```
## Pega todas as datas de entrada
```bash
    URL: (https://registro-ponto-back.vercel.app/api/workedHours/entry/:employee_id)
    Método: GET
    Descrição: Pega todas as horas de entrada
    Resposta de Sucesso: Retorna as horas de entrada
    Resposta de Erro: Retorna uma mensagem de erro se a exclusão do funcionário falhar.
```

## Pega todas as datas de saida
```bash
    URL: (https://registro-ponto-back.vercel.app/api/workedHours/exit/:employee_id)
    Método: GET
    Descrição: Pega todas as horas de saida
    Resposta de Sucesso: Retorna as horas de saida
    Resposta de Erro: Retorna uma mensagem de erro se a exclusão do funcionário falhar.
```
## Stay in touch

- Author - [Patricia Oliveira](https://www.linkedin.com/in/patricia-silva-oliveira-/)

