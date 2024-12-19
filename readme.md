
# API RESTful para Gerenciamento de Usuários e Produtos 🧑‍💻🛒

Bem-vindo à **API RESTful para Gerenciamento de Usuários e Produtos**! Este projeto permite que você gerencie usuários e produtos de uma maneira simples e eficiente com autenticação via JWT (JSON Web Token). 🚀

---

## Funcionalidades ✨

- **CRUD de Usuários**: Criar, ler, atualizar e excluir usuários. 👤
- **CRUD de Produtos**: Gerenciar produtos com nome e preço. 🛍️
- **Autenticação com JWT**: Segurança com autenticação baseada em token. 🔐
- **Validação de Dados**: Garante que os dados fornecidos sejam válidos e seguros. ✅

---

## Tecnologias 🔧

- **Express.js**: Framework minimalista para criar a API. 🚗
- **MongoDB**: Banco de dados NoSQL para armazenar usuários e produtos. 🗃️
- **Mongoose**: ODM (Object Data Modeling) para trabalhar com MongoDB. 🛠️
- **JWT**: Autenticação segura com tokens. 🔑
- **bcryptjs**: Hashing de senhas para maior segurança. 🔒
- **CORS**: Permite que a API seja acessada de diferentes domínios. 🌐

---

## Instalação 📥

### Passo 1: Clone o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/api-gerenciamento.git
```

### Passo 2: Instale as Dependências

Acesse a pasta do projeto e instale as dependências:

```bash
cd api-gerenciamento
npm install
```

### Passo 3: Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias, como a URI do MongoDB:

```
MONGO_URI=mongodb://localhost:27017/nome_do_banco
JWT_SECRET=sua_chave_secreta
PORT=3000
```

---

## Rodando o Projeto 🚀

Para iniciar a API, basta rodar o comando:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

---

## Endpoints da API 📡

### 1. **Registrar Usuário (POST)** 👥

- **URL**: `/api/users`
- **Método**: `POST`
- **Body (JSON)**:

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

- **Resposta**:

```json
{
  "message": "Usuário registrado com sucesso!"
}
```

---

### 2. **Login (POST)** 🔑

- **URL**: `/api/login`
- **Método**: `POST`
- **Body (JSON)**:

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

- **Resposta**:

```json
{
  "token": "seu_token_jwt_aqui"
}
```

---

### 3. **Criar Produto (POST)** 🛒

- **URL**: `/api/products`
- **Método**: `POST`
- **Cabeçalhos**: 
  - `Authorization: Bearer seu_token_jwt_aqui`

- **Body (JSON)**:

```json
{
  "name": "Camiseta Personalizada",
  "price": 39.99
}
```

- **Resposta**:

```json
{
  "message": "Produto criado com sucesso!"
}
```

---

### 4. **Listar Produtos (GET)** 📜

- **URL**: `/api/products`
- **Método**: `GET`
- **Cabeçalhos**: 
  - `Authorization: Bearer seu_token_jwt_aqui`

- **Resposta**:

```json
[
  {
    "_id": "produto_id_aqui",
    "name": "Camiseta Personalizada",
    "price": 39.99
  }
]
```

---

### 5. **Atualizar Produto (PUT)** ✏️

- **URL**: `/api/products/:id`
- **Método**: `PUT`
- **Cabeçalhos**: 
  - `Authorization: Bearer seu_token_jwt_aqui`

- **Body (JSON)**:

```json
{
  "name": "Camiseta Personalizada - Nova",
  "price": 49.99
}
```

- **Resposta**:

```json
{
  "message": "Produto atualizado com sucesso!"
}
```

---

### 6. **Deletar Produto (DELETE)** ❌

- **URL**: `/api/products/:id`
- **Método**: `DELETE`
- **Cabeçalhos**: 
  - `Authorization: Bearer seu_token_jwt_aqui`

- **Resposta**:

```json
{
  "message": "Produto deletado com sucesso!"
}
```

---

## Testando a API no Postman 🧑‍💻

Siga os passos abaixo para testar a API usando o Postman:

1. **Registrar um Usuário**:
   - Envie uma solicitação `POST` para `/api/users` com o corpo do usuário.
   
2. **Login**:
   - Envie uma solicitação `POST` para `/api/login` com as credenciais do usuário e receba o token JWT.

3. **Criar Produto**:
   - Envie uma solicitação `POST` para `/api/products` com o corpo do produto, incluindo o token JWT no cabeçalho `Authorization`.

4. **Listar Produtos**:
   - Envie uma solicitação `GET` para `/api/products` com o token JWT no cabeçalho.

5. **Atualizar Produto**:
   - Envie uma solicitação `PUT` para `/api/products/:id` com o corpo da atualização e o token JWT no cabeçalho.

6. **Deletar Produto**:
   - Envie uma solicitação `DELETE` para `/api/products/:id` com o token JWT no cabeçalho.

---

## Contribuindo 🤝

Se você quiser contribuir com melhorias ou adicionar novas funcionalidades, fique à vontade! Abra uma *issue* ou envie um *pull request* com suas alterações.

---

## Licença 📜

Este projeto está licenciado sob a **MIT License.**

---

🎉 **Obrigado por usar minha API de Gerenciamento de Usuários e Produtos!** 🎉

---

