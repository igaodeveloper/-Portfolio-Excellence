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
      created_at: new Date().toISOString(),
      visitor_name: 'Usuário Exemplo',
      visitor_email: 'usuario@exemplo.com',
      content: 'Este é um comentário de exemplo para demonstração.',
      rating: 5,
      emotion: 'happy',
      is_approved: true,
    },
    {
      id: 2,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      visitor_name: 'Outro Visitante',
      visitor_email: null,
      content: 'Adorei o portfólio! Muito profissional e bem feito.',
      rating: 4,
      emotion: 'love',
      reply: 'Obrigado pelo feedback! Fico feliz que tenha gostado.',
      replied_at: new Date().toISOString(),
      is_approved: true,
    },
  ];

  return {
    from: () => ({
      select: () => ({
        eq: () => ({
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
        }),
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
        eq: () => ({
          select: () => ({
            single: () => ({
              data: {
                ...mockComments[0],
                reply: 'Resposta mock',
                replied_at: new Date().toISOString(),
              },
              error: null,
            }),
          }),
        }),
      }),
      delete: () => ({
        eq: () => ({
          data: null,
          error: null,
        }),
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
