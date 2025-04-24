import { createClient } from '@supabase/supabase-js';
import { Comment, CreateCommentDto, CommentReplyDto } from '../types/comments';

// Inicializa o cliente Supabase com tratamento de erro
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Verificar se as variáveis de ambiente estão definidas
let supabase;
try {
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      'Variáveis de ambiente Supabase não encontradas. Usando mock data.',
    );
    supabase = mockSupabaseClient();
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Erro ao inicializar cliente Supabase:', error);
  supabase = mockSupabaseClient();
}

// Cliente mock para desenvolvimento sem Supabase configurado
function mockSupabaseClient() {
  const mockComments: Comment[] = [
    {
      id: 1,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      visitor_name: 'Mariana Silva',
      visitor_email: 'mariana.silva@email.com',
      content:
        'Seu portfólio está incrível! A organização e o design clean transmitem profissionalismo. Os projetos estão bem apresentados e a seção de skills deixa claro suas competências. Parabéns pelo trabalho!',
      rating: 5,
      emotion: 'love',
      reply:
        'Muito obrigado pelo feedback, Mariana! Fico feliz que tenha gostado do design e da organização. Trabalhei bastante para que a apresentação fosse clara e profissional.',
      replied_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      is_approved: true,
    },
    {
      id: 2,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      visitor_name: 'Carlos Mendes',
      visitor_email: 'carlos.tech@gmail.com',
      content:
        'Achei muito interessante seu projeto de e-commerce. As tecnologias que você utilizou são exatamente as que estamos implementando na minha empresa. Você estaria disponível para uma conversa sobre possíveis oportunidades de trabalho?',
      rating: 5,
      emotion: 'surprised',
      reply:
        'Olá Carlos! Agradeço pelo interesse no meu trabalho. Estou absolutamente disponível para conversarmos sobre oportunidades. Pode entrar em contato comigo pelo email de contato ou pelo LinkedIn. Aguardo seu contato!',
      replied_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      is_approved: true,
    },
    {
      id: 3,
      created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      visitor_name: 'Ana Paula Ferreira',
      visitor_email: 'ana.ferreira@outlook.com',
      content:
        'Gostei muito do seu portfólio, mas senti falta de mais detalhes sobre o processo de desenvolvimento dos projetos. Seria interessante incluir os desafios que você enfrentou e como os superou!',
      rating: 4,
      emotion: 'thinking',
      reply:
        'Ana, muito obrigado pelo feedback construtivo! Você tem toda razão, incluir mais detalhes sobre o processo de desenvolvimento e os desafios enfrentados seria muito valioso. Vou implementar essas melhorias em breve!',
      replied_at: new Date(Date.now() - 9 * 86400000).toISOString(),
      is_approved: true,
    },
    {
      id: 4,
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
      visitor_name: 'Roberto Almeida',
      visitor_email: null,
      content:
        'Excelente trabalho! Sua experiência com React e TypeScript é impressionante. O site está muito responsivo e a performance é ótima mesmo nos projetos mais complexos. Continue assim!',
      rating: 5,
      emotion: 'happy',
      is_approved: true,
    },
    {
      id: 5,
      created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      visitor_name: 'Juliana Costa',
      visitor_email: 'ju.costa@email.com',
      content:
        'Parabéns pelo portfólio! O layout está moderno e intuitivo. Uma sugestão: talvez pudesse adicionar uma seção mostrando seu processo criativo, seria interessante ver como você estrutura seus projetos desde o início.',
      rating: 4,
      emotion: 'happy',
      is_approved: true,
    },
    {
      id: 6,
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      visitor_name: 'Pedro Henrique Santos',
      visitor_email: 'pedro.dev@gmail.com',
      content:
        'Encontrei seu portfólio através de uma recomendação e fiquei realmente impressionado com a qualidade do seu trabalho. A arquitetura de software que você implementou no projeto de gestão financeira é exatamente o que estávamos procurando como referência. Você teria disponibilidade para uma consultoria?',
      rating: 5,
      emotion: 'love',
      reply:
        'Olá Pedro! Fico muito feliz que tenha gostado do meu trabalho, especialmente do projeto de gestão financeira. Tenho disponibilidade sim para consultoria. Por favor, entre em contato através do formulário de contato ou diretamente pelo meu email profissional para conversarmos sobre os detalhes. Será um prazer contribuir com seu projeto!',
      replied_at: new Date(Date.now() - 23 * 86400000).toISOString(),
      is_approved: true,
    },
  ];

  // Adicionar alguns comentários pendentes para a parte administrativa
  const pendingComments: Comment[] = [
    {
      id: 7,
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      visitor_name: 'Lucas Oliveira',
      visitor_email: 'lucas.oliveira@email.com',
      content:
        'Ótimo portfólio! Gostaria de saber se você aceita trabalhos como freelancer para desenvolvimento de landing pages.',
      rating: 5,
      emotion: 'happy',
      is_approved: false,
    },
    {
      id: 8,
      created_at: new Date(Date.now() - 1.5 * 86400000).toISOString(),
      visitor_name: 'Fernanda Lima',
      visitor_email: 'nanda.lima@hotmail.com',
      content:
        'Seu portfólio está incrível! Especialmente os projetos que utilizam React. Estou iniciando na área e seu trabalho é uma grande inspiração para mim.',
      rating: 5,
      emotion: 'love',
      is_approved: false,
    },
  ];

  // Combinar comentários aprovados e pendentes
  const allMockComments = [...mockComments, ...pendingComments];

  return {
    from: () => ({
      select: () => ({
        eq: (field: string, value: any) => {
          // Filtra por aprovados ou pendentes
          if (field === 'is_approved') {
            const filtered = allMockComments.filter(
              (c) => c.is_approved === value,
            );
            return {
              order: () => ({
                data: filtered,
                error: null,
              }),
              data: filtered.length > 0 ? filtered[0] : null,
              error: null,
              single: () => ({
                data: filtered.length > 0 ? filtered[0] : null,
                error: null,
              }),
            };
          }
          // Filtra por ID
          if (field === 'id') {
            const comment = allMockComments.find((c) => c.id === value);
            return {
              data: comment,
              error: null,
              single: () => ({
                data: comment,
                error: null,
              }),
            };
          }
          return {
            order: () => ({
              data: mockComments,
              error: null,
            }),
            data: mockComments[0],
            error: null,
            single: () => ({
              data: mockComments[0],
              error: null,
            }),
          };
        },
        data: mockComments,
        error: null,
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: {
              ...mockComments[0],
              id: Date.now(),
            },
            error: null,
          }),
        }),
      }),
      update: () => ({
        eq: (field: string, value: any) => {
          // Encontrar o comentário pelo ID
          const commentIndex = allMockComments.findIndex((c) => c.id === value);
          const comment =
            commentIndex >= 0 ? allMockComments[commentIndex] : null;

          return {
            select: () => ({
              single: () => ({
                data: comment
                  ? {
                      ...comment,
                      reply: 'Resposta adicionada via mock',
                      replied_at: new Date().toISOString(),
                      is_approved: true,
                    }
                  : null,
                error: null,
              }),
            }),
          };
        },
      }),
      delete: () => ({
        eq: (field: string, value: any) => {
          // Simular deleção encontrando e removendo o item (apenas simulação)
          const index = allMockComments.findIndex((c) => c.id === value);
          if (index >= 0) {
            // Em um caso real, removeriam o item, mas aqui apenas simulamos
            console.log(`Simulando remoção do comentário ID ${value}`);
          }
          return {
            data: null,
            error: null,
          };
        },
      }),
    }),
  };
}

/**
 * Serviço para gerenciar comentários
 */
export const CommentsService = {
  /**
   * Obtém todos os comentários aprovados
   */
  getAll: async (): Promise<Comment[]> => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar comentários:', error);
      throw error;
    }

    return data as Comment[];
  },

  /**
   * Obtém todos os comentários pendentes (apenas admin)
   */
  getPending: async (): Promise<Comment[]> => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar comentários pendentes:', error);
      throw error;
    }

    return data as Comment[];
  },

  /**
   * Obtém um comentário por ID
   */
  getById: async (id: number): Promise<Comment | null> => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Erro ao buscar comentário ID ${id}:`, error);
      throw error;
    }

    return data as Comment;
  },

  /**
   * Cria um novo comentário
   * Por padrão, os comentários são criados com is_approved = false e precisam ser aprovados por um admin
   */
  create: async (comment: CreateCommentDto): Promise<Comment> => {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          ...comment,
          is_approved: false,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar comentário:', error);
      throw error;
    }

    return data as Comment;
  },

  /**
   * Responde a um comentário (apenas admin)
   */
  reply: async (id: number, replyData: CommentReplyDto): Promise<Comment> => {
    const { data, error } = await supabase
      .from('comments')
      .update({
        reply: replyData.reply,
        replied_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Erro ao responder comentário ID ${id}:`, error);
      throw error;
    }

    return data as Comment;
  },

  /**
   * Aprova um comentário (apenas admin)
   */
  approve: async (id: number): Promise<Comment> => {
    const { data, error } = await supabase
      .from('comments')
      .update({ is_approved: true })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Erro ao aprovar comentário ID ${id}:`, error);
      throw error;
    }

    return data as Comment;
  },

  /**
   * Rejeita um comentário (apenas admin)
   */
  reject: async (id: number): Promise<void> => {
    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      console.error(`Erro ao rejeitar comentário ID ${id}:`, error);
      throw error;
    }
  },
};

export default CommentsService;
