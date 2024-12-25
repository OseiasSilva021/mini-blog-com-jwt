

# 🚀 **Projeto de Autenticação, Blog e Personalização de Perfil com Node.js** 🧑‍💻

Este projeto é uma aplicação completa com **autenticação de usuários**, **blog simples** e **personalização de perfil**. Utiliza **Node.js**, **Express**, **MongoDB**, **JWT (JSON Web Token)** e **Multer** para upload de fotos de perfil. O sistema também inclui uma funcionalidade para redefinir a senha via e-mail. Os dados dos posts e perfis são armazenados no **MongoDB**, garantindo persistência e segurança. 💻🔒📖🖼️

---

# Clique para ver o Vídeo de Demonstração ⬇️
[![Demo do Projeto](https://img.youtube.com/vi/E2tpsKQCpNM/maxresdefault.jpg)](https://youtu.be/E2tpsKQCpNM)

---

## 📋 **Funcionalidades**:

- **Login de Usuário**: Acesso com e-mail e senha 🔐💻  
  - Limite de 5 tentativas de login falhadas. Após atingir esse limite, o login é bloqueado por 15 minutos.
- **Registro de Usuário**: Cadastro de novos usuários 📥✍️
- **Blog**: Usuários podem criar e visualizar posts 📝📖
- **Armazenamento de Posts e Perfis**: Dados são salvos no **MongoDB**, incluindo posts e fotos de perfil 🔄💾
- **Personalização de Perfil**: Usuários podem alterar nome, e-mail e foto de perfil 🖼️🔧
- **Redefinição de Senha**: Os usuários podem redefinir suas senhas através de um link enviado por e-mail 📧🔑
- **API Backend**: Com rotas protegidas e autenticação via **JWT** 🔑🖥️
- **Upload de Arquivos**: Usuários podem enviar imagens para seu perfil utilizando **Multer** 📷📂

---

## 🚀 **Tecnologias Utilizadas**:

- **Node.js**: Plataforma de backend 🖥️⚙️
- **Express**: Framework para criação de rotas e servidor ⚡📡
- **MongoDB**: Banco de dados NoSQL para armazenar posts e usuários 📄🗃️
- **JWT (JSON Web Token)**: Autenticação segura para as rotas 🚡🔒
- **Multer**: Middleware para lidar com o upload de arquivos (fotos de perfil) 📷💾
- **Nodemailer**: Envio de e-mails para redefinição de senha 📧📬
- **CORS**: Permite a comunicação entre diferentes origens (cross-origin resource sharing) 🔄🌐
- **Path**: Módulo para lidar com caminhos de diretórios e arquivos no servidor 🛠️🗂️
- **Express JSON**: Middleware para análise de dados no formato JSON 📂🔍

---

## ⚙️ **Configuração do Projeto**:

### 1. **Clonar o Repositório**:
Clone este repositório para o seu computador:

```bash
git clone https://github.com/OseiasSilva021/mini-blog-com-jwt.git
```

### 2. **Instalar Dependências**:
Navegue até a pasta do projeto e instale as dependências:

```bash
cd mini-blog-com-jwt
npm install
```

### 3. **Configurar o Banco de Dados**:
Este projeto utiliza o **MongoDB**. Você precisará de uma instância do MongoDB rodando. Configure a conexão no arquivo `config/db.js`.

### 4. **Configurar o Envio de E-mails**:
Configure o **Nodemailer** no arquivo `.env` com as credenciais do seu provedor de e-mail (como Gmail, Outlook, etc.). 📧🔧

---

## 🛠️ **Executando o Projeto**:

Para rodar o servidor, utilize o comando abaixo:

```bash
npm start
```

Isso iniciará o servidor na porta `3000`, e o backend ficará acessível em `http://localhost:3000`. 🎉🚀

---

## 🌐 **Frontend**:

O frontend é uma interface simples com **HTML**, **CSS** e **JavaScript**. Ele permite que os usuários façam login, se registrem, interajam com o **blog**, redefinam suas senhas e **personalizem seu perfil**.

### Principais páginas:

- **Login**: Página para autenticar o usuário 🔍🔐
- **Registro**: Página para criar uma nova conta ✍️📋
- **Redefinição de Senha**: Página onde o usuário solicita o envio de um link para redefinir a senha 📧🔑
- **Blog**: Página onde os usuários podem criar posts e visualizar posts de outros usuários 📖📝
- **Perfil**: Página para o usuário personalizar seu perfil, com a opção de alterar nome, e-mail e foto 🖼️✨

### **Personalização de Perfil**:

- **Alterar Nome**: O usuário pode alterar seu nome de usuário 📝🔤.
- **Alterar E-mail**: O usuário pode atualizar seu e-mail 📨💬.
- **Foto de Perfil**: O usuário pode fazer upload de uma nova foto de perfil 📷🖼️.

As mudanças são feitas em tempo real e salvas no **MongoDB** para persistência. 🛠️💾

---

## 📝 **Estrutura do Blog**:

### Como funciona o blog:
1. Os usuários podem criar posts no frontend. 📝
2. Cada post contém um título e um conteúdo. 🖋️
3. Os posts são armazenados no **MongoDB** para persistência, podendo ser acessados a qualquer momento. 📄💾

### Funcionalidades do Blog:
- **Criar Post**: Usuários podem adicionar novos posts. ✍️📖
- **Visualizar Posts**: Os posts são exibidos na página do blog. 👀📜
- **Armazenamento no MongoDB**: Os posts ficam armazenados no banco de dados, permitindo a persistência entre sessões. 💾🔄

---

## 💬 **Como Contribuir**:

1. **Faça um Fork** deste repositório. 🍴
2. Crie uma branch para sua nova feature:

```bash
git checkout -b minha-nova-feature
```

3. Realize as alterações e faça um commit:

```bash
git commit -m 'Adiciona nova feature'
```

4. Faça o Push da sua branch:

```bash
git push origin minha-nova-feature
```

5. Abra um **Pull Request** para a branch principal deste repositório. 🔄👨‍💻

---

### **Licença**:
Este projeto está licenciado sob a licença MIT ✍️📜

--- 

