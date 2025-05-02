# 📝 Todo List - Projeto Fullstack

Aplicação de lista de tarefas (todo list) com autenticação, controle de histórico e design minimalista. Backend estruturado com padrão MVC e frontend moderno e responsivo.

---
![todoImg](https://github.com/user-attachments/assets/cb9b3f5f-e3c8-40ca-b799-f2f71b0fbf76)
*** Design ainda não definitivo ***

## Paleta de cores

![Untitled](https://github.com/user-attachments/assets/01ac0d2a-c7dc-4808-ae83-e717159fbdb8)


## 🚀 Tecnologias Utilizadas

### ⚙️ Backend (Node.js)  
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) **Node.js**  
- ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) **Express.js**  
- 🔐 **JWT** para autenticação  
- 🔄 **Sequelize ORM**  
- 🧾 **Padrão MVC + API RESTful**  
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) **PostgreSQL**  
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) **Docker & Docker Compose**

### 💻 Frontend (React)  
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React.js**  
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**  
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) **React Router Dom**  

### 🗃️ Banco de Dados  
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)  

### 🧰 Outras Ferramentas  
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)  
- 🔐 **bcrypt** para hash de senhas  

---

## 🔐 Autenticação JWT

- Geração de token no login  
- Middleware para proteger rotas privadas  
- Decodificação do token com ID do usuário  
- Armazenamento seguro no frontend  

---

## 📦 Endpoints da API

| Método | Rota           | Descrição                         |
|--------|----------------|-----------------------------------|
| POST   | `/auth/register` | Criação de conta                  |
| POST   | `/auth/login`    | Login de usuário                  |
| GET    | `/tarefas`       | Listar tarefas                    |
| POST   | `/tarefas`       | Criar tarefa                      |
| PUT    | `/tarefas/:id`   | Atualizar tarefa                  |
| DELETE | `/tarefas/:id`   | Excluir tarefa e salvar histórico |
| GET    | `/historico`     | Ver tarefas excluídas
