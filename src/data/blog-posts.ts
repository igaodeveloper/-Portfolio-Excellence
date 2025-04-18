export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  categories: string[];
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Funcionalidades Poderosas do CSS Moderno que Você Deve Conhecer',
    slug: 'funcionalidades-css-moderno',
    excerpt:
      'Conheça as mais recentes e poderosas funcionalidades do CSS que estão transformando o desenvolvimento web e simplificando a criação de layouts complexos.',
    content: `
# O Futuro do CSS: Explorando as Novas Funcionalidades

O CSS tem evoluído significativamente nos últimos anos, trazendo funcionalidades poderosas que simplificam o desenvolvimento de interfaces e possibilitam designs mais sofisticados sem depender tanto de JavaScript. Neste artigo, vamos explorar as novidades mais promissoras do CSS e como elas estão transformando o desenvolvimento front-end.

## Container Queries

Uma das funcionalidades mais aguardadas pelos desenvolvedores front-end finalmente chegou: as Container Queries. Diferente das Media Queries, que se baseiam nas dimensões da viewport, as Container Queries permitem aplicar estilos com base no tamanho do container pai.

Isso resolve um problema antigo: componentes reutilizáveis que precisam se adaptar ao espaço disponível, independentemente do tamanho da tela. Veja como funciona:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }
}
\`\`\`

Com este código, o componente \`.card\` reorganiza seu layout quando seu container tem pelo menos 400px de largura, não quando a viewport atinge determinada largura.

## Propriedades Customizadas (CSS Variables)

As propriedades customizadas, ou variáveis CSS, revolucionaram a maneira como lidamos com valores reutilizáveis no CSS:

\`\`\`css
:root {
  --cor-primaria: #3b82f6;
  --cor-secundaria: #1d4ed8;
  --espacamento-base: 1rem;
}

.botao {
  background-color: var(--cor-primaria);
  padding: var(--espacamento-base);
  border-radius: calc(var(--espacamento-base) / 2);
}

.botao:hover {
  background-color: var(--cor-secundaria);
}
\`\`\`

A verdadeira potência das variáveis CSS está na possibilidade de alterá-las via JavaScript ou com media queries, permitindo sistemas de temas, modo escuro e muito mais.

## CSS Grid e Subgrid

O CSS Grid transformou completamente os layouts web, permitindo designs bidimensionais complexos de forma nativa. A novidade agora é o Subgrid, que permite que elementos filhos participem do grid do elemento pai:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
\`\`\`

Isso resolve problemas de alinhamento complexos que antes exigiam soluções pouco elegantes.

## Functions como clamp(), min() e max()

Funções matemáticas no CSS trouxeram enorme flexibilidade:

\`\`\`css
.container {
  /* Largura responsiva entre 320px e 1200px */
  width: clamp(320px, 80vw, 1200px);
  
  /* Fonte que cresce com a viewport, mas com limites */
  font-size: clamp(1rem, 2vw + 0.5rem, 2rem);
  
  /* Padding que nunca fica menor que 1rem */
  padding: max(1rem, 3vh);
}
\`\`\`

A função \`clamp()\` sozinha reduziu drasticamente a necessidade de media queries para tamanhos responsivos.

## Seletores Avançados

Os novos seletores tornam o CSS mais expressivo:

- Seletor \`:is()\`: simplifica seletores múltiplos
- Seletor \`:where()\`: similar ao \`:is()\`, mas com especificidade zero
- Seletor \`:has()\`: seleciona elementos baseados em seus filhos

\`\`\`css
/* Estiliza qualquer seção que contenha uma imagem */
section:has(img) {
  padding: 2rem;
}

/* Simplifica múltiplos seletores de uma vez */
:is(h1, h2, h3):hover {
  color: var(--cor-destaque);
}
\`\`\`

## Aspectos de Performance

Com as novas propriedades como \`content-visibility\` e \`contain\`, podemos melhorar significativamente a performance de renderização:

\`\`\`css
.card {
  content-visibility: auto;
  contain-intrinsic-size: 200px 300px;
}
\`\`\`

A propriedade \`content-visibility: auto\` informa ao navegador que pode pular a renderização de elementos fora da viewport, economizando recursos.

## Conclusão

O CSS moderno está cada vez mais poderoso, permitindo implementações que antes exigiriam JavaScript complexo. Adotar essas novas funcionalidades não apenas melhora a performance dos nossos projetos, mas também simplifica o código e facilita a manutenção.

À medida que os navegadores continuam ampliando o suporte a estas características, é o momento ideal para começar a incorporá-las em seu fluxo de desenvolvimento, sempre verificando a compatibilidade através de recursos como [caniuse.com](https://caniuse.com).

O futuro do CSS é promissor, e mantendo-se atualizado com estas funcionalidades, você estará preparado para criar interfaces mais eficientes, acessíveis e sofisticadas com menos código.
    `,
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    date: '2023-09-15',
    readTime: 8,
    author: {
      name: 'João Silva',
      avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      bio: 'Desenvolvedor Front-end apaixonado por UI/UX e novas tecnologias web.',
    },
    categories: ['CSS', 'Front-end'],
    tags: ['css', 'web design', 'desenvolvimento web', 'frontend'],
  },
  {
    id: 2,
    title:
      'Melhores Práticas com React: Padrões para Código Limpo e Performático',
    slug: 'melhores-praticas-com-react',
    excerpt:
      'Um guia completo sobre padrões, técnicas e melhores práticas para desenvolver aplicações React modernas, eficientes e fáceis de manter.',
    content: `
# Melhores Práticas com React: Padrões para Código Limpo e Performático

O React revolucionou a forma como construímos interfaces de usuário, oferecendo um modelo declarativo e baseado em componentes. No entanto, com grande poder vem grande responsabilidade. Neste artigo, exploraremos padrões e melhores práticas para construir aplicações React que não apenas funcionem bem, mas que sejam performáticas, sustentáveis e fáceis de manter.

## Organizando Componentes

### Componentes Funcionais vs. Componentes de Classe

Atualmente, componentes funcionais com Hooks são a abordagem recomendada pelo time do React:

\`\`\`jsx
// ✅ Componente funcional moderno com hooks
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <Spinner />;
  
  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
};
\`\`\`

### Componentes Pequenos e Focados

Divida interfaces complexas em componentes menores, cada um com uma responsabilidade única:

\`\`\`jsx
// ❌ Componente grande com múltiplas responsabilidades
const Dashboard = () => {
  // ... 100 linhas de lógica
  return (
    <div>
      {/* ... muitos elementos e lógica condicional */}
    </div>
  );
};

// ✅ Componentes menores e focados
const Dashboard = () => (
  <div className="dashboard">
    <Header />
    <Sidebar />
    <MainContent>
      <StatsSummary />
      <RecentActivity />
    </MainContent>
  </div>
);
\`\`\`

## Gerenciando Estados

### Use Context API para Estados Globais

Para dados que precisam ser acessados por muitos componentes, a Context API é uma solução elegante:

\`\`\`jsx
// Criando um contexto de tema
const ThemeContext = createContext();

// Provedor que encapsula a aplicação
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Consumindo o contexto em qualquer componente
const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      className={\`btn btn-\${theme}\`}
    >
      Alternar Tema
    </button>
  );
};
\`\`\`

### Reduzindo Re-renderizações

Utilize técnicas como memoização para evitar re-renderizações desnecessárias:

\`\`\`jsx
// Componente memoizado só re-renderiza se props mudarem
const ExpensiveComponent = React.memo(({ data }) => {
  // Renderização custosa
  return <div>{/* ... */}</div>;
});

// Função memoizada para cálculos caros
const ProductList = ({ products }) => {
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);
  
  return (
    <ul>
      {sortedProducts.map(product => (
        <li key={product.id}>{product.name}: R\${product.price}</li>
      ))}
    </ul>
  );
};
\`\`\`

## Hooks Customizados

Extraia lógica reutilizável para hooks customizados:

\`\`\`jsx
// Hook customizado para formulários
const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => setValues(initialState);
  
  return { values, handleChange, resetForm };
};

// Utilizando o hook
const SignupForm = () => {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {/* ... outros campos */}
      <button type="submit">Cadastrar</button>
    </form>
  );
};
\`\`\`

## React com TypeScript

TypeScript adiciona tipagem estática ao seu código React, reduzindo bugs e melhorando a experiência de desenvolvimento:

\`\`\`tsx
interface UserProps {
  name: string;
  age: number;
  isAdmin?: boolean;
  onProfileClick: (userId: string) => void;
}

const UserCard: React.FC<UserProps> = ({ 
  name, 
  age, 
  isAdmin = false,
  onProfileClick 
}) => {
  return (
    <div onClick={() => onProfileClick(name)}>
      <h3>{name}</h3>
      <p>Idade: {age}</p>
      {isAdmin && <span className="badge">Administrador</span>}
    </div>
  );
};
\`\`\`

## Testes

Invista em testes para garantir que seus componentes funcionem conforme esperado:

\`\`\`jsx
// Teste de um componente com React Testing Library
test('renderiza o nome do usuário', () => {
  render(<UserCard name="Ana Silva" age={28} onProfileClick={() => {}} />);
  expect(screen.getByText('Ana Silva')).toBeInTheDocument();
});
\`\`\`

## Conclusão

Seguir estas melhores práticas ajudará você a construir aplicações React mais limpas, performáticas e fáceis de manter. Lembre-se que o React está em constante evolução, então é importante manter-se atualizado com as recomendações mais recentes.

Os princípios fundamentais permanecem os mesmos: componentes pequenos e focados, gerenciamento inteligente de estado, e reutilização de código. Aplicando-os consistentemente, você colherá os benefícios de uma base de código mais sustentável e uma melhor experiência para seus usuários.
    `,
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    date: '2023-10-10',
    readTime: 10,
    author: {
      name: 'Ana Pereira',
      avatar: 'https://avatars.githubusercontent.com/u/23456789?v=4',
      bio: 'Engenheira de Software especializada em React e ecossistema JavaScript.',
    },
    categories: ['JavaScript', 'React', 'Boas práticas'],
    tags: ['react', 'javascript', 'frontend', 'desenvolvimento', 'hooks'],
  },
  {
    id: 3,
    title: 'Design Responsivo com Tailwind CSS: Além do Básico',
    slug: 'design-responsivo-com-tailwind',
    excerpt:
      'Aprenda técnicas avançadas de design responsivo utilizando Tailwind CSS, desde layouts fluidos até componentes adaptáveis para qualquer dispositivo.',
    content: `
# Design Responsivo com Tailwind CSS: Além do Básico

O Tailwind CSS revolucionou a maneira como desenvolvemos interfaces, popularizando o conceito de utility-first CSS. Neste artigo, vamos explorar técnicas avançadas para criar designs verdadeiramente responsivos com Tailwind, indo além dos conceitos básicos.

## Entendendo a Abordagem do Tailwind para Responsividade

O Tailwind utiliza um sistema de breakpoints "mobile-first", onde o design é inicialmente pensado para dispositivos móveis e depois adaptado para telas maiores:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Este texto cresce conforme a tela aumenta
</div>
\`\`\`

Os breakpoints padrão são:
- \`sm\`: 640px
- \`md\`: 768px
- \`lg\`: 1024px
- \`xl\`: 1280px
- \`2xl\`: 1536px

## Layouts Responsivos Avançados

### Container Queries com Tailwind

Uma técnica poderosa é combinar Grid ou Flexbox com os modificadores responsivos:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Items se reorganizam automaticamente conforme a tela -->
  <div class="bg-white p-4 rounded shadow">Item 1</div>
  <div class="bg-white p-4 rounded shadow">Item 2</div>
  <!-- Mais itens... -->
</div>
\`\`\`

### Layouts Adaptáveis

Para layouts que mudam completamente entre dispositivos:

\`\`\`html
<div>
  <!-- Layout para Mobile: Vertical -->
  <div class="flex flex-col md:hidden gap-4">
    <header class="bg-blue-500 p-4">Cabeçalho</header>
    <nav class="bg-blue-200 p-4">Menu</nav>
    <main class="bg-white p-4">Conteúdo</main>
  </div>
  
  <!-- Layout para Desktop: Com Sidebar -->
  <div class="hidden md:grid md:grid-cols-[250px_1fr] md:h-screen">
    <nav class="bg-blue-200 p-4">Menu Lateral</nav>
    <div class="flex flex-col">
      <header class="bg-blue-500 p-4">Cabeçalho</header>
      <main class="bg-white p-4 flex-grow">Conteúdo</main>
    </div>
  </div>
</div>
\`\`\`

## Componentes Responsivos

### Cards Adaptáveis

\`\`\`html
<div class="bg-white rounded-lg shadow overflow-hidden">
  <div class="md:flex">
    <!-- Imagem fica em cima no mobile, à esquerda no desktop -->
    <img 
      class="h-48 w-full md:w-48 md:h-auto object-cover"
      src="imagem.jpg" 
      alt="Imagem do card"
    />
    <div class="p-4">
      <h3 class="font-bold text-xl mb-2">Título do Card</h3>
      <p class="text-gray-700">
        Descrição do card que se adapta ao layout.
      </p>
    </div>
  </div>
</div>
\`\`\`

### Navegação Responsiva

\`\`\`html
<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <div class="flex items-center">
        <img src="logo.svg" alt="Logo" class="h-8" />
      </div>
      
      <!-- Menu para Desktop -->
      <div class="hidden md:flex space-x-4">
        <a href="#" class="hover:text-blue-300">Home</a>
        <a href="#" class="hover:text-blue-300">Produtos</a>
        <a href="#" class="hover:text-blue-300">Sobre</a>
        <a href="#" class="hover:text-blue-300">Contato</a>
      </div>
      
      <!-- Botão para Menu Mobile -->
      <button class="md:hidden" id="menu-button">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    
    <!-- Menu Mobile (oculto inicialmente) -->
    <div class="md:hidden hidden" id="mobile-menu">
      <div class="flex flex-col space-y-3 py-4">
        <a href="#" class="hover:text-blue-300">Home</a>
        <a href="#" class="hover:text-blue-300">Produtos</a>
        <a href="#" class="hover:text-blue-300">Sobre</a>
        <a href="#" class="hover:text-blue-300">Contato</a>
      </div>
    </div>
  </div>
</nav>
\`\`\`

## Técnicas Avançadas

### Tipografia Responsiva

Além dos modificadores básicos, podemos usar clamp() via classes personalizadas:

\`\`\`css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.375rem)',
        'fluid-xl': 'clamp(1.25rem, 1.125rem + 1.25vw, 2rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.25rem + 2.5vw, 3rem)',
      }
    }
  }
}
\`\`\`

### Customização Avançada de Breakpoints

Para projetos com necessidades específicas:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    }
  }
}
\`\`\`

### Performance Responsiva

Imagens responsivas para performance:

\`\`\`html
<img 
  src="small.jpg" 
  srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w"
  sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 2000px"
  alt="Imagem responsiva otimizada"
  class="w-full h-auto"
/>
\`\`\`

## Acessibilidade Responsiva

É essencial garantir que seu design responsivo seja acessível em todos os tamanhos de tela:

\`\`\`html
<button 
  class="p-2 md:p-4 text-sm md:text-base"
  aria-label="Fechar menu"
>
  <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
</button>
\`\`\`

## Testando Responsividade

O Tailwind facilita o desenvolvimento responsivo, mas é essencial testar em dispositivos reais ou usando as ferramentas de desenvolvedor do navegador. Preste atenção especial aos pontos de quebra entre os breakpoints padrão.

## Conclusão

O Tailwind CSS oferece uma abordagem poderosa e flexível para design responsivo. Ao dominar suas técnicas avançadas, você pode criar interfaces que se adaptam elegantemente a qualquer dispositivo, mantendo o código limpo e manutenível.

Lembre-se sempre que responsividade não se trata apenas de fazer elementos se encaixarem em telas menores, mas de proporcionar a melhor experiência possível em qualquer dispositivo que seu usuário possa estar utilizando.
    `,
    coverImage:
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    date: '2023-11-05',
    readTime: 7,
    author: {
      name: 'Carlos Mendes',
      avatar: 'https://avatars.githubusercontent.com/u/34567890?v=4',
      bio: 'Designer de interface e desenvolvedor front-end especializado em experiências responsivas e acessíveis.',
    },
    categories: ['CSS', 'Tailwind', 'Boas práticas'],
    tags: ['tailwind', 'css', 'design responsivo', 'frontend', 'mobile-first'],
  },
  {
    id: 4,
    title: 'Animações Web Modernas: Performance e Acessibilidade',
    slug: 'animacoes-web-modernas',
    excerpt:
      'Como criar animações web que não apenas impressionam visualmente, mas também são performáticas e acessíveis para todos os usuários.',
    content: `
# Animações Web Modernas: Performance e Acessibilidade

As animações web podem transformar uma interface estática em uma experiência interativa e envolvente. No entanto, muitas vezes os desenvolvedores sacrificam a performance e a acessibilidade em nome de efeitos visuais impressionantes. Neste artigo, vamos explorar como criar animações que atendam a todos esses requisitos.

## Conteúdo completo em breve...
    `,
    coverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    date: '2023-11-20',
    readTime: 6,
    author: {
      name: 'João Silva',
      avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      bio: 'Desenvolvedor Front-end apaixonado por UI/UX e novas tecnologias web.',
    },
    categories: ['JavaScript', 'CSS', 'Performance'],
    tags: ['animações', 'css', 'javascript', 'performance', 'acessibilidade'],
  },
  {
    id: 5,
    title: 'Arquitetura Front-end Escalável para Projetos Grandes',
    slug: 'arquitetura-frontend-escalavel',
    excerpt:
      'Estratégias e padrões para organizar código front-end em grandes projetos, permitindo escalabilidade e manutenção a longo prazo.',
    content: `
# Arquitetura Front-end Escalável para Projetos Grandes

À medida que os projetos front-end crescem em complexidade, a organização do código se torna crucial para a manutenção e evolução do sistema. Neste artigo, compartilho abordagens testadas para arquiteturas front-end escaláveis.

## Conteúdo completo em breve...
    `,
    coverImage:
      'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    date: '2023-12-05',
    readTime: 9,
    author: {
      name: 'Ana Pereira',
      avatar: 'https://avatars.githubusercontent.com/u/23456789?v=4',
      bio: 'Engenheira de Software especializada em React e ecossistema JavaScript.',
    },
    categories: ['JavaScript', 'Arquitetura', 'Boas práticas'],
    tags: [
      'arquitetura',
      'frontend',
      'escalabilidade',
      'organização de código',
    ],
  },
  {
    id: 6,
    title: 'Acessibilidade Web: Além das Diretrizes WCAG',
    slug: 'acessibilidade-web-alem-wcag',
    excerpt:
      'Explorando práticas de acessibilidade web além das diretrizes WCAG, com foco na experiência real dos usuários com deficiências.',
    content: `
# Acessibilidade Web: Além das Diretrizes WCAG

A acessibilidade web vai muito além de simplesmente seguir as diretrizes WCAG. Trata-se de entender as necessidades reais das pessoas com deficiências e criar experiências verdadeiramente inclusivas.

## Conteúdo completo em breve...
    `,
    coverImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    date: '2023-12-15',
    readTime: 8,
    author: {
      name: 'Carlos Mendes',
      avatar: 'https://avatars.githubusercontent.com/u/34567890?v=4',
      bio: 'Designer de interface e desenvolvedor front-end especializado em experiências responsivas e acessíveis.',
    },
    categories: ['Acessibilidade', 'Boas práticas', 'UX'],
    tags: ['acessibilidade', 'inclusão', 'wcag', 'ux', 'usabilidade'],
  },
];
