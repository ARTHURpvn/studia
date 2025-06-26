# 🧠 StudIA — Gerenciador Acadêmico com IA e Modo Offline

> Plataforma moderna para centralizar anotações, provas, tarefas, calendários e planejamento semanal, com suporte a IA, funcionamento offline e integração com Supabase.

---

## 🚀 Stack Tecnológica

### 🎨 Front-end

- [Next.js](https://nextjs.org/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) (animações)
- [Zustand](https://github.com/pmndrs/zustand) (estado global)
- [TanStack Query (React Query)](https://tanstack.com/query) (server state)
- [Tiptap](https://tiptap.dev/) (editor avançado para anotações)
- [Tui.Calendar](https://github.com/nhn/tui.calendar) (visualização semanal/mensal de tarefas)
- [Axios](https://axios-http.com/) (HTTP client)
- [Zod](https://zod.dev/) (validação de dados)
- [Pragmatic Drag and Drop](https://atlassian.design/components/pragmatic-drag-and-drop/about) (drag and drop)

### 🖥️ Back-end

- **Laravel**
- Integração com [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- APIs RESTful escritas do zero com boas práticas

---

## 🐳 Docker & Ambiente

> O projeto está pronto para rodar em containers com Docker.

### ✨ Comandos úteis

**Subir os containers**
```bash
docker compose up -d
```

**Iniciar FrontEnd Localmente**
```bash
cd frontend
npm install
```

**Acessar Front-end**
- App: http://localhost:3000

Acessar Back-end
- API: http://localhost:8080

---

📦 raiz-do-projeto <br>
├── frontend/        → Interface com Next.js <br>
├── backend/         → API em Laravel <br>
├── docker/ <br>
├── docker-compose.yml <br>
├── README.md <br>
└── .env

---

🧠 Funcionalidades
- ✅ Sistema de Login
- ✅ Anotações com Markdown com o Tiptap
- ✅ Organização por pastas/subpastas
- ✅ Planejamento semanal com arrastar e soltar
- ✅ Calendário de compromissos
- ✅ Modo offline
- ✅ Notas com cálculo automático de média
- ✅ Provas com alertas e resumo por IA
- ✅ Busca global inteligente
- ✅ Design responsivo e otimizado

---

🤝 Contribuindo
Sinta-se livre para abrir issues, pull requests ou sugestões. Toda ajuda é bem-vinda!

**Rotas Laravel**
- Para registrar: /register
- Para login: /login
