# 🌟 API RESTful para Gerenciamento de Usuários e Produtos 🧑‍💻🛒

Bem-vindo à **API RESTful para Gerenciamento de Usuários e Produtos**! Este projeto permite que você gerencie usuários e produtos de uma maneira simples e eficiente com autenticação via JWT (JSON Web Token). 🚀

---

## 📋 Funcionalidades

✅ **CRUD de Usuários**: Criar, ler, atualizar e excluir usuários. 👤  
✅ **CRUD de Produtos**: Gerenciar produtos com nome e preço. 🛒  
✅ **Autenticação com JWT**: Segurança com autenticação baseada em token. 🔒  
✅ **Validação de Dados**: Garante que os dados fornecidos sejam válidos e seguros.   
✅ **Recuperação de Senha**: Possibilidade de redefinir senhas esquecidas. 🔑  
✅ **Autenticação de Dois Fatores (2FA)**: Uma camada extra de segurança. 🔐

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** 🟢
- **Express.js** 🚀
- **MongoDB** 🍃
- **Mongoose** 🔗
- **JWT (Json Web Token)** 🔒
- **Bcrypt** 🛡️
- **Joi** ✅
- **Nodemailer** 📧

---

## 📦 Instalação e Execução

### 1️⃣ Clone o repositório:
```bash
$ git clone https://github.com/seuusuario/api-gerenciamento.git
```

### 2️⃣ Acesse a pasta do projeto:
```bash
$ cd api-gerenciamento
```

### 3️⃣ Instale as dependências:
```bash
$ npm install
```

### 4️⃣ Configure o arquivo `.env`:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
MONGO_URI=mongodb://localhost:27017/nome_do_banco
JWT_SECRET=sua-chave-secreta
PORT=3000
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
```

### 5️⃣ Execute o servidor:
```bash
$ npm start
```
O servidor estará rodando em: `http://localhost:3000` 🎉

---

## 🔀 Rotas Disponíveis

### 1️⃣ **Criar Usuário**  
**POST** `/users`  
📥 **Body:**
```json
{
  "name": "Seu Nome",
  "email": "seuemail@email.com",
  "password": "suaSenha123"
}
```
📤 **Resposta:**
```json
{
  "user": {
    "_id": "id_do_usuario",
    "name": "Seu Nome",
    "email": "seuemail@email.com"
  }
}
```

---

### 2️⃣ **Login de Usuário**  
**POST** `/login`  
📥 **Body:**
```json
{
  "email": "seuemail@email.com",
  "password": "suaSenha123"
}
```
📤 **Resposta:**
```json
{
  "token": "seu_jwt_token"
}
```

---

### 3️⃣ **Recuperação de Senha**  
**POST** `/recover-password`  
📥 **Body:**
```json
{
  "email": "seuemail@email.com"
}
```
📤 **Resposta:**
```json
{
  "message": "Instruções para redefinir a senha foram enviadas para o seu email."
}
```

---

### 4️⃣ **Autenticação de Dois Fatores (2FA)**  
**POST** `/2fa`  
📥 **Body:**
```json
{
  "email": "seuemail@email.com",
  "code": "123456"
}
```
📤 **Resposta:**
```json
{
  "message": "Autenticação de dois fatores concluída com sucesso."
}
```

---

### 5️⃣ **Listar Todos os Usuários**  
**GET** `/users`  
📤 **Resposta:**
```json
[
  {
    "_id": "id_do_usuario",
    "name": "Nome",
    "email": "email@email.com"
  }
]
```

---

### 6️⃣ **Atualizar Usuário**  
**PUT** `/users/:id`  
📥 **Body (opcional):**
```json
{
  "name": "Novo Nome",
  "password": "novaSenha123"
}
```
📤 **Resposta:**
```json
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "_id": "id_do_usuario",
    "name": "Novo Nome",
    "email": "email@email.com"
  }
}
```

---

### 7️⃣ **Deletar Usuário**  
**DELETE** `/users/:id`  
📤 **Resposta:**
```json
{
  "message": "Usuário deletado com sucesso",
  "user": {
    "_id": "id_do_usuario",
    "name": "Nome",
    "email": "email@email.com"
  }
}
```

---

## 🛡️ Middleware

- **Validação de Dados:** Utiliza **Joi** para validar nome, email e senha durante a criação de usuários.  
- **Autenticação:** Proteja suas rotas com JWT para garantir acesso seguro.  
- **2FA:** Confirmação de identidade através de códigos temporários.  

---

## 📝 Observações

⚠️ **Recomendações de Segurança:**  
- Utilize HTTPS em produção.  
- Proteja suas variáveis de ambiente.  
- Limite o acesso às rotas de atualização e exclusão.

🚀 **Futuras Implementações:**  
- Paginação e filtragem na listagem de usuários e produtos.  
- Logs de auditoria para rastrear ações do sistema.  

---

Feito com ❤️ por [Seu Nome](https://github.com/seuusuario) 🙌

