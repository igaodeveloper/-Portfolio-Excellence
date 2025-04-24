import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaReply, FaHeart, FaShareAlt } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { RiLoader4Line } from 'react-icons/ri';

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
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';

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
              <motion.button
                type="button"
                onClick={() => onChange(emotion)}
                className={`text-3xl transition-all duration-300 p-2 ${
                  value === emotion
                    ? 'scale-125 ring-2 ring-primary ring-offset-2 bg-primary/10 rounded-full'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Emoção: ${emotion}`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {EMOTION_EMOJIS[emotion as EmotionType]}
              </motion.button>
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
          <motion.button
            key={i}
            type="button"
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHoverValue(ratingValue)}
            onMouseLeave={() => setHoverValue(0)}
            className="bg-transparent border-none outline-none cursor-pointer p-1 text-3xl"
            aria-label={`Avaliação ${ratingValue} de ${max}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaStar
              className={`transition-colors duration-200 ${
                ratingValue <= (hoverValue || value)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

const CommentCard = ({ comment }: { comment: Comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const formattedDate = format(
    new Date(comment.created_at),
    "d 'de' MMMM, yyyy 'às' HH:mm",
    { locale: ptBR },
  );

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Comentário de ${comment.visitor_name}: "${comment.content}"`,
    );
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
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
              <motion.span
                className="text-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ yoyo: 5, duration: 0.5 }}
              >
                {EMOTION_EMOJIS[comment.emotion as EmotionType]}
              </motion.span>
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

        <CardFooter className="px-4 md:px-6 py-3 flex justify-between items-center border-t">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${liked ? 'text-red-500' : ''}`}
                    onClick={handleLike}
                  >
                    <motion.div
                      animate={liked ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <FaHeart />
                    </motion.div>
                    {likeCount > 0 && likeCount}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{liked ? 'Remover curtida' : 'Curtir comentário'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip open={showShareTooltip}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <FaShareAlt />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showShareTooltip ? 'Copiado!' : 'Compartilhar'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {comment.reply && (
            <Badge variant="outline" className="bg-primary/5 text-primary">
              Respondido
            </Badge>
          )}
        </CardFooter>

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
    </motion.div>
  );
};

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [formProgress, setFormProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
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

  // Observar as mudanças nos campos do formulário para atualizar o progresso
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Calcular o progresso com base nos campos preenchidos
      let progress = 0;
      if (value.visitor_name && value.visitor_name.length >= 2) progress += 25;
      if (value.content && value.content.length >= 5) progress += 50;
      if (value.rating) progress += 12.5;
      if (value.emotion) progress += 12.5;
      setFormProgress(progress);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

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

      setFormProgress(0);
      setActiveTab('view');

      toast({
        title: 'Comentário enviado!',
        description:
          'Seu comentário foi enviado e será exibido após aprovação. Obrigado pelo feedback!',
        duration: 5000,
      });

      // Recarregar comentários para mostrar atualizações
      await loadComments();
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 md:px-8 bg-background w-full"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Comentários
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deixe seu feedback sobre o meu trabalho. Sua opinião é muito
            importante para mim!
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-12"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="view" className="relative overflow-hidden">
              Ver Comentários
              <AnimatePresence>
                {activeTab === 'view' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </TabsTrigger>
            <TabsTrigger value="add" className="relative overflow-hidden">
              Adicionar Comentário
              <AnimatePresence>
                {activeTab === 'add' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="view"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="text-4xl text-primary"
                >
                  <RiLoader4Line />
                </motion.div>
                <p className="text-muted-foreground">
                  Carregando comentários...
                </p>
              </div>
            ) : error ? (
              <Alert variant="destructive" className="my-8">
                <AlertDescription className="flex flex-col items-center justify-center py-4">
                  <p className="mb-4">{error}</p>
                  <Button
                    variant="outline"
                    onClick={loadComments}
                    className="mt-2"
                  >
                    Tentar novamente
                  </Button>
                </AlertDescription>
              </Alert>
            ) : comments.length === 0 ? (
              <motion.div
                className="text-center py-12 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground mb-4">
                  Nenhum comentário ainda. Seja o primeiro a comentar!
                </p>
                <Button onClick={() => setActiveTab('add')} variant="outline">
                  Deixar um comentário
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                      }}
                    >
                      <CommentCard comment={comment} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="add"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <motion.div
              className="bg-card rounded-lg p-6 shadow-lg border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                Deixe seu comentário
              </h3>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2 text-center">
                  Progresso do formulário
                </p>
                <Progress value={formProgress} className="h-2" />
              </div>

              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
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
                  </motion.div>

                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
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
                  </motion.div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FormField
                        control={form.control}
                        name="visitor_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Seu nome"
                                {...field}
                                className="transition-all focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
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
                                className="transition-all focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comentário *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Escreva seu comentário aqui..."
                              className="min-h-[120px] transition-all focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <div className="flex justify-center pt-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        className="gap-2 min-w-[140px]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: 'linear',
                              }}
                              className="h-4 w-4"
                            >
                              <RiLoader4Line />
                            </motion.div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar <IoSend />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
