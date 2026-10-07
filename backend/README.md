# ConectaTech - Backend

Backend da aplicação ConectaTech, desenvolvido para fornecer uma API REST para gerenciamento de usuários, produtos, categorias, carrinho, endereços e pedidos.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Supabase
- JavaScript
- JWT
- bcryptjs
- CORS
- dotenv
- Git e GitHub
- Postman

## Funcionalidades

### Autenticação

- Login de usuários
- Autenticação por token JWT
- Controle de acesso por tipo de usuário
- Proteção de rotas administrativas

### Usuários

- Cadastro de usuários
- Consulta de usuários
- Atualização de dados
- Exclusão de usuários

### Produtos

- Listagem de produtos
- Consulta de produto por ID
- Cadastro de produtos
- Atualização de produtos
- Controle de estoque
- Ativação e desativação de produtos

### Categorias

- Listagem de categorias
- Cadastro de categorias
- Atualização de categorias
- Exclusão de categorias

### Carrinho

- Consulta do carrinho
- Adição de produtos
- Atualização de quantidade
- Remoção de produtos
- Cálculo do subtotal
- Cálculo do valor total

### Endereços

- Cadastro de endereço
- Listagem dos endereços do usuário
- Atualização de endereço
- Exclusão de endereço

### Pedidos

- Criação de pedidos
- Listagem dos pedidos do usuário
- Consulta de pedido por ID
- Registro dos itens do pedido
- Controle de estoque durante a criação do pedido

### Área administrativa

- Listagem de produtos
- Cadastro e atualização de produtos
- Controle de estoque
- Ativação e desativação de produtos
- Listagem de pedidos
- Consulta detalhada de pedidos
- Atualização do status dos pedidos
- Dashboard administrativo com informações gerais do sistema

## Estrutura do projeto

```text
src/
├── controllers/
├── database/
├── dto/
├── middlewares/
├── repositories/
├── routes/
└── server.js