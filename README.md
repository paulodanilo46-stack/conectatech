# ConectaTech — Plataforma de E-commerce

## Sobre o projeto

O **ConectaTech** é uma plataforma de comércio eletrônico desenvolvida para a venda de produtos de tecnologia, como notebooks, smartphones, periféricos e componentes eletrônicos.

O sistema permite que os clientes naveguem pelo catálogo de produtos, realizem cadastros, adicionem itens ao carrinho e acompanhem seus pedidos. Também possui um ambiente administrativo destinado ao gerenciamento dos produtos, pedidos e informações da loja.

O projeto foi desenvolvido utilizando tecnologias web modernas, com frontend e backend organizados em módulos separados dentro do mesmo repositório.

## Funcionalidades

### Área do cliente
- Cadastro e autenticação de usuários.
- Visualização e pesquisa de produtos.
- Filtragem por categorias e faixa de preço.
- Ordenação de produtos.
- Adição e remoção de produtos do carrinho.
- Atualização da quantidade de itens.
- Gerenciamento de informações do perfil.
- Cadastro e gerenciamento de endereços.
- Finalização de compras.
- Consulta e acompanhamento de pedidos.
- Página institucional e central de suporte.

### Área administrativa
- Acesso restrito ao administrador.
- Dashboard com informações gerais da loja.
- Gerenciamento de produtos.
- Cadastro, edição e exclusão de produtos.
- Gerenciamento de pedidos.
- Visualização dos detalhes dos pedidos.
- Atualização do status dos pedidos.
- Consulta de relatórios.

## Tecnologias utilizadas

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Icons
- Lucide React

### Backend
- Node.js
- Express
- JavaScript
- PostgreSQL
- Supabase
- JWT (JSON Web Token)
- Multer

## Estrutura do projeto

```text
ConectaTech/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

*Observação: a estrutura interna pode variar conforme a organização atual dos arquivos do projeto.*

## Requisitos para execução

Antes de iniciar, é necessário ter instalado:

- Node.js.
- npm.
- Git.
- Conta no Supabase para utilização do banco de dados PostgreSQL.

## Como executar o projeto

O frontend e o backend possuem dependências próprias. Por isso, a instalação deve ser realizada separadamente em cada pasta.

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd ConectaTech
```

### 2. Configurar o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na pasta `backend`, utilizando as variáveis de ambiente necessárias para a conexão com o banco de dados e autenticação.

Exemplo:

```env
PORT=3000
DATABASE_URL=sua_url_de_conexao_do_supabase
JWT_SECRET=sua_chave_secreta
```

**Importante:** substitua os valores de exemplo pelas credenciais correspondentes ao seu ambiente. Não compartilhe ou envie o arquivo `.env` para o GitHub.

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em:

```text
http://localhost:3000
```

### 3. Configurar o frontend

Abra outro terminal e entre na pasta principal do projeto:

```bash
cd ConectaTech/frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar o sistema, geralmente:

```text
http://localhost:5173
```

**Atenção:** mantenha o backend e o frontend em execução simultaneamente para que a aplicação consiga realizar as requisições à API.

## Banco de dados

O projeto utiliza PostgreSQL por meio do Supabase
