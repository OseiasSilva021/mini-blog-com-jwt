
---

# 🚀 **Projeto de Autenticação, Blog e Personalização de Perfil com Node.js** 🧑‍💻

Este projeto é uma aplicação completa com **autenticação de usuários**, **blog** simples e **personalização de perfil**. Utiliza **Node.js**, **Express**, **JWT (JSON Web Token)** e **LocalStorage** no frontend para gerenciamento de posts e fotos de perfil. 💻🔒📖🖼️

---

## 📋 **Funcionalidades**:

- **Login de Usuário**: Acesso com e-mail e senha 🔐
- **Registro de Usuário**: Cadastro de novos usuários 📥
- **Blog**: Usuários podem criar posts e visualizá-los no frontend 📝
- **Armazenamento de Posts**: Posts são salvos no **LocalStorage** para persistência no frontend 🔄
- **Personalização de Perfil**: Usuários podem alterar nome, e-mail e foto de perfil 🖼️
- **API Backend**: Com rotas protegidas e configuração de autenticação via **JWT** 🔑

---

## 🚀 **Tecnologias Utilizadas**:

- **Node.js**: Plataforma de backend 🖥️
- **Express**: Framework para criação de rotas e servidor ⚡
- **MongoDB**: Banco de dados NoSQL para armazenar os usuários 🗄️
- **JWT (JSON Web Token)**: Autenticação segura para as rotas 🛡️
- **LocalStorage**: Armazenamento de posts no navegador do usuário 🖥️
- **Multer**: Middleware para lidar com o upload de arquivos (fotos de perfil) 📷

---

## ⚙️ **Configuração do Projeto**:

### 1. **Clonar o Repositório**:
Clone este repositório para o seu computador:
```bash
git clone https://github.com/seu-usuario/projeto-de-login-com-blog.git
```

### 2. **Instalar Dependências**:
Navegue até a pasta do projeto e instale as dependências:
```bash
cd projeto-de-login-com-blog
npm install
```

### 3. **Configurar o Banco de Dados**:
Este projeto utiliza o **MongoDB**. Você precisará de uma instância do MongoDB rodando. Configure a conexão no arquivo `config/db.js`.

---

## 🛠️ **Executando o Projeto**:

Para rodar o servidor, utilize o comando abaixo:
```bash
npm start
```

Isso iniciará o servidor na porta `3000`, e o backend ficará acessível em `http://localhost:3000`. 🎉

---

## 🌐 **Frontend**:

O frontend é uma interface simples com **HTML**, **CSS** e **JavaScript**. Ele permite que os usuários façam login, se registrem, interajam com o **blog** e **personalizem seu perfil**.

### Principais páginas:

- **Login**: Página para autenticar o usuário 🖱️
- **Registro**: Página para criar uma nova conta ✍️
- **Blog**: Página onde os usuários podem criar posts 📖
- **Perfil**: Página para o usuário personalizar seu perfil, com a opção de alterar nome, e-mail e foto 🖼️

### **Personalização de Perfil**:

- **Alterar Nome**: O usuário pode alterar seu nome de usuário 📝.
- **Alterar E-mail**: O usuário pode atualizar seu e-mail 📨.
- **Foto de Perfil**: O usuário pode fazer upload de uma nova foto de perfil 📷.

As mudanças são feitas em tempo real e salvas no **LocalStorage** do navegador para persistência.

---

## 📝 **Estrutura do Blog**:

### Como funciona o blog:
1. Os usuários podem criar posts no frontend.
2. Cada post contém um título e um conteúdo.
3. Os posts são salvos no **LocalStorage** do navegador para que permaneçam disponíveis enquanto o usuário estiver na mesma sessão ou até que o LocalStorage seja limpo.

### Funcionalidades do Blog:
- **Criar Post**: Usuários podem adicionar novos posts.
- **Visualizar Posts**: Os posts são exibidos na página do blog.
- **Armazenamento Local**: Os posts ficam armazenados no navegador, sem a necessidade de um banco de dados para essa funcionalidade.

---

## 💬 **Como Contribuir**:

1. **Faça um Fork** deste repositório.
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
5. Abra um **Pull Request** para a branch principal deste repositório.

---

### **Licença**:
Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

