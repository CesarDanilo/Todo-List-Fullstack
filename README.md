<p align="center">
  <img src='https://github.com/user-attachments/assets/f88bbf98-0508-40ae-91c6-533e4ccc314a' alt="Todo List Logo" width="150" /> 
</p>

<p align="center">
  <strong>Lista de Tarefas</strong> com autenticação JWT, histórico de exclusão e interface moderna. <br />
  Desenvolvida com <strong>Node.js</strong> e <strong>React.js</strong>, seguindo o padrão <strong>MVC</strong> e com <strong>design responsivo</strong>.
</p>

---

## Funcionalidades

- Autenticação via JWT  
- CRUD completo de tarefas  
- Histórico de exclusões  
- Contador por status (pendentes, concluídas, lixeira)  
- Interface minimalista e responsiva  

---

## Interface (em desenvolvimento)

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb9b3f5f-e3c8-40ca-b799-f2f71b0fbf76" alt="Preview da Interface" width="600"/>
</p>

<p align="center"><em>*Design provisório*</em></p>

---

## Paleta de Cores

<p align="center">
  <img src="https://github.com/user-attachments/assets/01ac0d2a-c7dc-4808-ae83-e717159fbdb8" alt="Paleta de Cores" width="600"/>
</p>

---

## ⚙️ Tecnologias

### Backend
- Node.js + Express  
- Sequelize + PostgreSQL  
- JWT  
- Docker  
- Padrão MVC + API REST  

### Frontend
- React.js  
- Tailwind CSS  
- React Router DOM  

### Utilitários
- bcrypt  
- dotenv  
- cors  

---

## 🔐 Autenticação

- Geração e verificação de tokens JWT  
- Middleware para proteger rotas  
- Identificação de usuário via token  
- Armazenamento seguro no frontend  

---

## 📦 Endpoints REST

| Método | Rota             | Descrição                     |
|--------|------------------|-------------------------------|
| POST   | `/auth/register` | Cadastro de usuário           |
| POST   | `/auth/login`    | Login do usuário              |
| GET    | `/tarefas`       | Listar tarefas                |
| POST   | `/tarefas`       | Criar nova tarefa             |
| PUT    | `/tarefas/:id`   | Atualizar tarefa              |
| DELETE | `/tarefas/:id`   | Mover para histórico          |
| GET    | `/historico`     | Ver tarefas excluídas         |

---
