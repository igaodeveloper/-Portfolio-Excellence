import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaReply } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

import CommentsService from '../services/comments';
import { Comment, EmotionType, EMOTION_EMOJIS } from '../types/comments';

import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useToast } from './ui/use-toast';

// Schema para validação do formulário de comentários
const commentFormSchema = z.object({
  visitor_name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  visitor_email: z
    .string()
    .email({ message: 'Email inválido.' })
    .optional()
    .or(z.literal('')),
  content: z.string().min(5, {
    message: 'O comentário deve ter pelo menos 5 caracteres.',
  }),
  rating: z.number().min(1).max(5),
  emotion: z.string(),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

const EmotionSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const emotions: EmotionType[] = [
    'happy',
    'love',
    'surprised',
    'neutral',
    'thinking',
    'sad',
    'angry',
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {emotions.map((emotion) => (
        <TooltipProvider key={emotion}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onChange(emotion)}
                className={`text-3xl transition-all duration-300 transform hover:scale-125 ${
                  value === emotion
                    ? 'scale-125 ring-2 ring-primary ring-offset-2 bg-primary/10 rounded-full'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Emoção: ${emotion}`}
              >
                {EMOTION_EMOJIS[emotion as EmotionType]}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="capitalize">{emotion}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

const StarRating = ({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      {[...Array(max)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHoverValue(ratingValue)}
            onMouseLeave={() => setHoverValue(0)}
            className="bg-transparent border-none outline-none cursor-pointer p-0 text-3xl"
            aria-label={`Avaliação ${ratingValue} de ${max}`}
          >
            <FaStar
              className={`transition-colors duration-200 ${
                ratingValue <= (hoverValue || value)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

const CommentCard = ({ comment }: { comment: Comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = format(
    new Date(comment.created_at),
    "d 'de' MMMM, yyyy 'às' HH:mm",
    { locale: ptBR },
  );

  return (
    <Card className="overflow-hidden border-0 shadow-lg mb-4 bg-opacity-80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-2 pt-4 px-4 md:px-6 flex flex-row items-center gap-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.visitor_name}`}
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            {comment.visitor_name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold">{comment.visitor_name}</h4>
            <span className="text-2xl">
              {EMOTION_EMOJIS[comment.emotion as EmotionType]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < comment.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 md:px-6 pt-4">
        <p
          className={`text-sm sm:text-base ${!isExpanded && comment.content.length > 300 ? 'line-clamp-3' : ''}`}
        >
          {comment.content}
        </p>
        {comment.content.length > 300 && (
          <Button
            variant="link"
            className="p-0 h-auto text-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </Button>
        )}
      </CardContent>

      {comment.reply && (
        <CardFooter className="bg-primary/5 border-t border-primary/10 px-4 md:px-6 py-3 mt-2">
          <div className="flex items-start gap-3 w-full">
            <FaReply className="text-primary mt-1" />
            <div>
              <p className="font-semibold text-sm text-primary mb-1">
                Resposta:
              </p>
              <p className="text-sm">{comment.reply}</p>
              {comment.replied_at && (
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(comment.replied_at), "d 'de' MMMM, yyyy", {
                    locale: ptBR,
                  })}
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      visitor_name: '',
      visitor_email: '',
      content: '',
      rating: 5,
      emotion: 'happy',
    },
  });

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const data = await CommentsService.getAll();
      setComments(data);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
      setError(
        'Não foi possível carregar os comentários. Tente novamente mais tarde.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const onSubmit = async (data: CommentFormValues) => {
    try {
      setIsSubmitting(true);
      await CommentsService.create({
        visitor_name: data.visitor_name,
        visitor_email: data.visitor_email,
        content: data.content,
        rating: data.rating,
        emotion: data.emotion,
      });

      form.reset({
        visitor_name: '',
        visitor_email: '',
        content: '',
        rating: 5,
        emotion: 'happy',
      });

      toast({
        title: 'Comentário enviado!',
        description:
          'Seu comentário foi enviado e será exibido após aprovação. Obrigado pelo feedback!',
        duration: 5000,
      });
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      toast({
        title: 'Erro ao enviar comentário',
        description:
          'Ocorreu um erro ao enviar seu comentário. Tente novamente mais tarde.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 md:px-8 bg-background w-full"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Comentários
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deixe seu feedback sobre o meu trabalho. Sua opinião é muito
            importante para mim!
          </p>
        </div>

        <Tabs defaultValue="view" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="view">Ver Comentários</TabsTrigger>
            <TabsTrigger value="add">Adicionar Comentário</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                <p>{error}</p>
                <Button
                  variant="outline"
                  onClick={loadComments}
                  className="mt-4"
                >
                  Tentar novamente
                </Button>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum comentário ainda. Seja o primeiro a comentar!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CommentCard comment={comment} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Deixe seu comentário
              </h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <FormLabel className="text-center block mb-2">
                      Como você se sente?
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="emotion"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <EmotionSelector
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="text-center">
                    <FormLabel className="text-center block mb-2">
                      Avalie sua experiência
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <StarRating
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="visitor_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="visitor_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seu.email@exemplo.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comentário *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escreva seu comentário aqui..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar <IoSend />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
