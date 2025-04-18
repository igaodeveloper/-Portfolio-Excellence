export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count?: number;
}

export const categories: Category[] = [
  {
    id: "css",
    name: "CSS",
    slug: "css",
    description: "Artigos sobre CSS, design, layouts e estilização para web moderna.",
    count: 3
  },
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description: "Conteúdo sobre JavaScript, frameworks, bibliotecas e padrões de código.",
    count: 3
  },
  {
    id: "boas-praticas",
    name: "Boas práticas",
    slug: "boas-praticas",
    description: "Melhores práticas para desenvolvimento web, padrões de código e arquitetura.",
    count: 4
  },
  {
    id: "react",
    name: "React",
    slug: "react",
    description: "Tutoriais, guias e dicas para desenvolvimento com React e seu ecossistema.",
    count: 1
  },
  {
    id: "tailwind",
    name: "Tailwind",
    slug: "tailwind",
    description: "Como utilizar o Tailwind CSS para criar interfaces modernas e responsivas.",
    count: 1
  },
  {
    id: "performance",
    name: "Performance",
    slug: "performance",
    description: "Otimização, métricas e técnicas para melhorar a performance de aplicações web.",
    count: 1
  },
  {
    id: "front-end",
    name: "Front-end",
    slug: "front-end",
    description: "Desenvolvimento front-end, tendências e técnicas para interfaces modernas.",
    count: 2
  },
  {
    id: "acessibilidade",
    name: "Acessibilidade",
    slug: "acessibilidade", 
    description: "Criando web para todos: práticas de acessibilidade e inclusão digital.",
    count: 1
  },
  {
    id: "arquitetura",
    name: "Arquitetura",
    slug: "arquitetura",
    description: "Arquitetura de software, padrões de projeto e estruturação de código.",
    count: 1
  },
  {
    id: "ux",
    name: "UX",
    slug: "ux",
    description: "Experiência do usuário, usabilidade e design de interação.",
    count: 1
  }
]; 