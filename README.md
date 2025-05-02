<p align="center">
  <img src="https://github.com/user-attachments/assets/86db09fc-3010-4e50-84db-51bf0e5514ea" alt="Todo List Logo" width="120" />
</p>

<p align="center">
  Aplicação de lista de tarefas com autenticação via JWT, histórico de exclusão e interface moderna. <br />
  Desenvolvida com <strong>Node.js + React.js</strong>, seguindo o padrão <strong>MVC</strong> no backend e com <strong>design responsivo</strong> no frontend.
</p>


---

## ✨ Funcionalidades

- Autenticação com JWT  
- CRUD completo de tarefas  
- Histórico de tarefas excluídas  
- Contagem por status (pendentes, concluídas, lixeira)  
- Design minimalista e responsivo  

---

## 📸 Interface (em desenvolvimento)

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb9b3f5f-e3c8-40ca-b799-f2f71b0fbf76" alt="Preview da Interface" width="600"/>
</p>

<p align="center"><em>*Design ainda não definitivo*</em></p>

---

## 🎨 Paleta de Cores

<p align="center">
  <img src="https://github.com/user-attachments/assets/01ac0d2a-c7dc-4808-ae83-e717159fbdb8" alt="Paleta de Cores" width="600"/>
</p>

---

## ⚙️ Tecnologias

### 🔧 Backend (Node.js + Express)
- Node.js  
- Express.js  
- JWT (autenticação)  
- Sequelize ORM  
- PostgreSQL  
- Docker & Docker Compose  
- Padrão MVC + API RESTful  

### 💻 Frontend (React)
- React.js  
- Tailwind CSS  
- React Router DOM  

### 🧰 Utilitários
- bcrypt (hash de senhas)  
- Dotenv  
- Cors  

---

## 🔐 Autenticação

- Geração e verificação de token JWT  
- Middleware para rotas protegidas  
- Decodificação para identificar o usuário  
- Armazenamento seguro no frontend  

---

## 📦 Endpoints REST

| Método | Rota             | Ação                          |
|--------|------------------|-------------------------------|
| POST   | `/auth/register` | Registrar novo usuário        |
| POST   | `/auth/login`    | Autenticar usuário            |
| GET    | `/tarefas`       | Listar tarefas                |
| POST   | `/tarefas`       | Criar nova tarefa             |
| PUT    | `/tarefas/:id`   | Atualizar uma tarefa          |
| DELETE | `/tarefas/:id`   | Mover tarefa para o histórico |
| GET    | `/historico`     | Listar tarefas excluídas      |

---

