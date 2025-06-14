# Portfolio Excellence

![Portfolio Excellence](https://img.shields.io/badge/Portfolio-Excellence-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.3-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-cyan)
![Netlify](https://img.shields.io/badge/Netlify-Ready-success)

Portfolio Excellence é uma plataforma moderna para portfólios profissionais, construída com React, TypeScript, Vite e TailwindCSS. O projeto inclui um editor de código integrado, animações suaves e design responsivo.

## 🚀 Funcionalidades

- **Design Responsivo**: Compatível com todos os tamanhos de dispositivos
- **Editor de Código Integrado**: Crie e visualize código HTML/CSS/JS em tempo real
- **Animações Suaves**: Transições e animações otimizadas para performance
- **Admin Dashboard**: Área protegida para gerenciamento de conteúdo
- **Funções Serverless**: Integração com API Netlify Functions
- **Acessibilidade**: Compatível com leitores de tela e navegação por teclado

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio-excellence.git

# Entre na pasta do projeto
cd portfolio-excellence

# Instale as dependências
npm install

# Execute o ambiente de desenvolvimento
npm run dev
```

## 🏗️ Build e Deploy

### Build Local

```bash
# Gere a versão de produção
npm run build

# Visualize a versão de produção localmente
npm run preview
```

### Deploy no Netlify

O projeto está configurado para deploy automático no Netlify:

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente necessárias:
   - `VITE_BASE_PATH` - Caminho base para a aplicação (normalmente "/")
   - `VITE_TEMPO` - Define se as rotas temporárias estão ativas ("true" ou "false")
   - `SUPABASE_PROJECT_ID` - (Se necessário) ID do projeto Supabase

O arquivo `netlify.toml` já está configurado com as melhores práticas para otimização de performance.

## 🌐 Deploy na Vercel

Para garantir que o deploy funcione perfeitamente na Vercel, configure as seguintes variáveis de ambiente no painel do projeto na Vercel (Settings > Environment Variables):

- `VITE_BASE_PATH` = `/`
- `VITE_TEMPO` = `false` (ou `true` se usar rotas temporárias)
- `SUPABASE_PROJECT_ID` (se usar Supabase)
- `VITE_SUPABASE_URL` (se usar Supabase)
- `VITE_SUPABASE_KEY` (se usar Supabase)

**Importante:** Todas as variáveis do Vite devem começar com `VITE_`.

Depois de configurar, basta fazer o deploy normalmente.

## 🧩 Estrutura do Projeto

```
/
├── netlify/           # Configurações e funções do Netlify
│   └── functions/     # Funções serverless
├── public/            # Arquivos estáticos públicos
├── src/
│   ├── app/           # Configurações da aplicação
│   ├── components/    # Componentes React reutilizáveis
│   ├── contexts/      # Contextos React
│   ├── data/          # Dados estáticos
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Layouts da aplicação
│   ├── lib/           # Bibliotecas e utilidades
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços de API
│   ├── styles/        # Estilos globais
│   ├── types/         # Definições de tipos TypeScript
│   ├── utils/         # Funções utilitárias
│   ├── App.tsx        # Componente principal
│   ├── index.css      # Estilos globais
│   └── main.tsx       # Ponto de entrada da aplicação
└── tempo-routes.ts    # Rotas temporárias
```

## 📝 Uso

### Editor de Código

O editor de código permite trabalhar com HTML, CSS e JavaScript simultaneamente, com visualização em tempo real. Recursos:

- Destaque de sintaxe
- Autocompletar
- Visualização em tempo real
- Exportação e importação de código

### Funções Serverless

As funções Netlify estão disponíveis em:

- `/.netlify/functions/api` - API principal
- `/.netlify/functions/api/contact` - Envio de formulário de contato

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch com sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## 📧 Contato

Seu Nome - [seu-email@example.com](mailto:seu-email@example.com)

Link do projeto: [https://github.com/seu-usuario/portfolio-excellence](https://github.com/seu-usuario/portfolio-excellence)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Configuração do Supabase para o sistema de comentários

Para utilizar a funcionalidade de comentários, você precisa configurar o Supabase:

1. Crie uma conta no [Supabase](https://supabase.com/) e um novo projeto
2. Execute o script SQL localizado em `supabase/comments_table.sql` no editor SQL do Supabase
3. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=sua-chave-de-api-publica
```

4. Substitua `https://seu-projeto.supabase.co` pela URL do seu projeto Supabase
5. Substitua `sua-chave-de-api-publica` pela chave anon/pública do seu projeto (não use a chave secreta/service_role)

Você pode encontrar essas credenciais no painel do Supabase em "Configurações do Projeto" > "API".

Caso você não configure o Supabase, o sistema ainda funcionará com dados de exemplo para fins de demonstração e desenvolvimento.
