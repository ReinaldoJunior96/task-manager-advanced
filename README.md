# Task Manager PWA

## Visão Geral

Esta aplicação é um gerenciador de tarefas (Task Manager) desenvolvido como uma Progressive Web App (PWA) utilizando Vue 3. A aplicação permite que os usuários registrem e autentiquem, gerenciem suas tarefas, recebam notificações e desfrutem de uma experiência rápida e responsiva.

## Funcionalidades

### Autenticação de Usuários

- **Registro de Novos Usuários:** Permitir que novos usuários se registrem na aplicação.
- **Login e Logout:** Usuários podem fazer login e logout.
- **Proteção de Rotas:** Rotas que exigem autenticação estão protegidas.

### Gerenciamento de Tarefas (CRUD)

- **Criar Tarefa:** Permitir a criação de novas tarefas.
- **Visualizar Tarefas:** Exibir todas as tarefas do usuário logado.
- **Editar Tarefa:** Permitir a edição de uma tarefa existente.
- **Excluir Tarefa:** Permitir a exclusão de uma tarefa.

### Filtros e Ordenação

- **Filtrar por Status:** Filtrar tarefas por status (completa, incompleta).
- **Filtrar por Data de Criação:** Filtrar tarefas por data de criação.
- **Pesquisar Tarefas:** Pesquisar tarefas por palavras-chave.

### Notificações

- **Notificações de Prazo:** Notificar o usuário sobre tarefas próximas do prazo de conclusão.

### Performance

- **Carregamento Rápido:** A aplicação deve carregar rapidamente e ser responsiva.
- **Lazy Loading:** Utilização de técnicas de lazy loading para otimizar o carregamento de componentes e dados.

## Tecnologias e Ferramentas

### Frontend

- **Vue 3:** Framework JavaScript progressivo para construir interfaces de usuário.
- **Vue Router:** Gerenciamento de rotas para Vue.js.
- **Pinia:** Gerenciamento de estado para Vue 3.
- **Tailwind CSS:** Framework CSS para estilização.

### Armazenamento de Dados

- **LocalStorage:** Utilizado para salvar os dados da aplicação no navegador do usuário.

## Configuração e Instalação

### Pré-requisitos

- Node.js v16 ou superior
- npm ou yarn

### Passos para Configuração

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
