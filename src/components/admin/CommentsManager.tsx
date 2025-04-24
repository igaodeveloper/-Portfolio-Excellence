import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaReply,
  FaExclamationTriangle,
  FaToggleOn,
  FaToggleOff,
  FaEnvelope,
} from 'react-icons/fa';
import { RiLoader4Line } from 'react-icons/ri';
import { HiOutlineRefresh } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

import CommentsService from '../../services/comments';
import { Comment, EmotionType, EMOTION_EMOJIS } from '../../types/comments';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useToast } from '../ui/use-toast';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function CommentsManager() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [approvedComments, setApprovedComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [actionInProgress, setActionInProgress] = useState<{
    id: number;
    type: 'approve' | 'reject' | null;
  }>({ id: 0, type: null });
  const { toast } = useToast();

  // Carregar todos os comentários (pendentes e aprovados)
  const loadAllComments = async () => {
    try {
      setIsLoading(true);

      // Usar CommentsService para buscar comentários
      const approvedComments = await CommentsService.getAll();
      const pendingComments = await CommentsService.getPending();

      setApprovedComments(approvedComments);
      setPendingComments(pendingComments);
      setComments([...pendingComments, ...approvedComments]);
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os comentários.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshComments = async () => {
    setIsRefreshing(true);
    await loadAllComments();
    setIsRefreshing(false);

    toast({
      title: 'Atualizado',
      description: 'Comentários atualizados com sucesso',
    });
  };

  useEffect(() => {
    loadAllComments();
  }, []);

  // Aprovar um comentário
  const approveComment = async (id: number) => {
    try {
      setActionInProgress({ id, type: 'approve' });

      await CommentsService.approve(id);

      // Atualizar listas localmente
      const updatedComment = pendingComments.find((c) => c.id === id);
      if (updatedComment) {
        const updatedPendingComments = pendingComments.filter(
          (c) => c.id !== id,
        );
        const updatedApprovedComments = [
          { ...updatedComment, is_approved: true },
          ...approvedComments,
        ];

        setPendingComments(updatedPendingComments);
        setApprovedComments(updatedApprovedComments);

        // Atualizar lista completa
        setComments([...updatedPendingComments, ...updatedApprovedComments]);
      }

      toast({
        title: 'Comentário aprovado',
        description:
          'O comentário foi aprovado e já está visível publicamente!',
      });
    } catch (err) {
      console.error('Erro ao aprovar comentário:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível aprovar o comentário.',
        variant: 'destructive',
      });
    } finally {
      setActionInProgress({ id: 0, type: null });
    }
  };

  // Rejeitar um comentário
  const rejectComment = async (id: number) => {
    try {
      setActionInProgress({ id, type: 'reject' });

      await CommentsService.reject(id);

      // Atualizar listas localmente
      const updatedPendingComments = pendingComments.filter((c) => c.id !== id);
      setPendingComments(updatedPendingComments);

      // Atualizar lista completa
      setComments([...updatedPendingComments, ...approvedComments]);

      toast({
        title: 'Comentário rejeitado',
        description: 'O comentário foi rejeitado e removido permanentemente.',
      });
    } catch (err) {
      console.error('Erro ao rejeitar comentário:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível rejeitar o comentário.',
        variant: 'destructive',
      });
    } finally {
      setActionInProgress({ id: 0, type: null });
    }
  };

  // Responder a um comentário
  const submitReply = async () => {
    if (!selectedComment || !replyText.trim()) return;

    try {
      setIsSubmittingReply(true);

      await CommentsService.reply(selectedComment.id, { reply: replyText });

      // Atualizar listas localmente
      const updatedComment = {
        ...selectedComment,
        reply: replyText,
        replied_at: new Date().toISOString(),
      };

      // Determinar em qual lista o comentário está
      if (selectedComment.is_approved) {
        const updatedApprovedComments = approvedComments.map((c) =>
          c.id === selectedComment.id ? updatedComment : c,
        );
        setApprovedComments(updatedApprovedComments);
        setComments([...pendingComments, ...updatedApprovedComments]);
      } else {
        const updatedPendingComments = pendingComments.map((c) =>
          c.id === selectedComment.id ? updatedComment : c,
        );
        setPendingComments(updatedPendingComments);
        setComments([...updatedPendingComments, ...approvedComments]);
      }

      // Limpar estado de resposta
      setSelectedComment(null);
      setReplyText('');

      toast({
        title: 'Resposta enviada',
        description: 'Sua resposta foi enviada com sucesso!',
      });
    } catch (err) {
      console.error('Erro ao responder comentário:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a resposta.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Renderizar um cartão de comentário com controles de admin
  const CommentCard = ({ comment }: { comment: Comment }) => {
    const formattedDate = format(
      new Date(comment.created_at),
      "d 'de' MMMM, yyyy 'às' HH:mm",
      { locale: ptBR },
    );
    const isPending = !comment.is_approved;
    const isCurrentAction = actionInProgress.id === comment.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
        layout
      >
        <Card
          className={`overflow-hidden border shadow-sm mb-4 transition-all duration-300 
            ${isPending ? 'border-yellow-300 bg-yellow-50/5' : ''}
            ${isCurrentAction ? 'ring-2 ring-primary ring-opacity-50' : ''}
            hover:shadow-md`}
        >
          <CardHeader className="pb-2 px-4 md:px-6 flex flex-row items-center gap-4">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.visitor_name}`}
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {comment.visitor_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold flex items-center">
                    {comment.visitor_name}
                    <motion.span
                      className="ml-2 text-xl"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {EMOTION_EMOJIS[comment.emotion as EmotionType]}
                    </motion.span>
                    {isPending && (
                      <Badge
                        variant="outline"
                        className="ml-2 bg-yellow-100/30 text-yellow-700 border-yellow-300"
                      >
                        Pendente
                      </Badge>
                    )}
                  </h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-3 w-3 ${
                            i < comment.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {isPending && (
                  <div className="flex gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 transition-all"
                        onClick={() => approveComment(comment.id)}
                        disabled={isCurrentAction}
                      >
                        {isCurrentAction &&
                        actionInProgress.type === 'approve' ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: 'linear',
                            }}
                            className="mr-1"
                          >
                            <RiLoader4Line />
                          </motion.div>
                        ) : (
                          <FaCheck className="mr-1" />
                        )}
                        Aprovar
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
                        onClick={() => rejectComment(comment.id)}
                        disabled={isCurrentAction}
                      >
                        {isCurrentAction &&
                        actionInProgress.type === 'reject' ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: 'linear',
                            }}
                            className="mr-1"
                          >
                            <RiLoader4Line />
                          </motion.div>
                        ) : (
                          <FaTimes className="mr-1" />
                        )}
                        Rejeitar
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>

              {comment.visitor_email && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <FaEnvelope className="mr-1" size={10} />
                  {comment.visitor_email}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="px-4 md:px-6 py-3">
            <p className="text-sm">{comment.content}</p>
          </CardContent>

          {comment.reply ? (
            <CardFooter className="bg-primary/5 border-t border-primary/10 px-4 md:px-6 py-3">
              <div className="flex items-start gap-2 w-full">
                <FaReply className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-primary mb-1">
                    Sua resposta:
                  </p>
                  <p className="text-sm">{comment.reply}</p>
                  {comment.replied_at && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(
                        new Date(comment.replied_at),
                        "d 'de' MMMM, yyyy",
                        {
                          locale: ptBR,
                        },
                      )}
                    </p>
                  )}
                </div>
              </div>
            </CardFooter>
          ) : (
            <CardFooter className="px-4 md:px-6 py-3 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 hover:bg-primary/10 transition-colors"
                    onClick={() => {
                      setSelectedComment(comment);
                      setReplyText('');
                    }}
                  >
                    <FaReply /> Responder
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Responder ao comentário</DialogTitle>
                    <DialogDescription>
                      Responda ao comentário de {comment.visitor_name}.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="bg-muted/50 p-3 rounded-md my-3">
                    <p className="text-sm italic">{comment.content}</p>
                  </div>

                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escreva sua resposta aqui..."
                    className="min-h-[100px]"
                  />

                  <DialogFooter className="mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedComment(null);
                        setReplyText('');
                      }}
                      disabled={isSubmittingReply}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      disabled={!replyText.trim() || isSubmittingReply}
                      onClick={submitReply}
                      className="gap-1"
                    >
                      {isSubmittingReply ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: 'linear',
                            }}
                          >
                            <RiLoader4Line />
                          </motion.div>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <FaReply />
                          <span>Enviar resposta</span>
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciador de Comentários</h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={refreshComments}
            disabled={isRefreshing || isLoading}
          >
            {isRefreshing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <RiLoader4Line />
              </motion.div>
            ) : (
              <HiOutlineRefresh />
            )}
            {isRefreshing ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </motion.div>
      </div>

      {pendingComments.length > 0 && (
        <Alert className="bg-yellow-50/50 border-yellow-200 text-yellow-800">
          <FaExclamationTriangle className="h-4 w-4" />
          <AlertDescription>
            Você tem {pendingComments.length} comentário
            {pendingComments.length > 1 ? 's' : ''} pendente
            {pendingComments.length > 1 ? 's' : ''} de aprovação.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger
            value="pending"
            className="relative"
            disabled={isLoading}
          >
            <span className="flex items-center gap-1">
              Pendentes
              {pendingComments.length > 0 && (
                <Badge className="ml-1 bg-yellow-500 hover:bg-yellow-600">
                  {pendingComments.length}
                </Badge>
              )}
            </span>
            {activeTab === 'pending' && (
              <motion.div
                className="absolute -bottom-[1px] left-0 h-[2px] bg-primary w-full"
                layoutId="activeTabIndicator"
              />
            )}
          </TabsTrigger>

          <TabsTrigger
            value="approved"
            className="relative"
            disabled={isLoading}
          >
            <span className="flex items-center gap-1">
              Aprovados
              {approvedComments.length > 0 && (
                <Badge variant="outline">{approvedComments.length}</Badge>
              )}
            </span>
            {activeTab === 'approved' && (
              <motion.div
                className="absolute -bottom-[1px] left-0 h-[2px] bg-primary w-full"
                layoutId="activeTabIndicator"
              />
            )}
          </TabsTrigger>

          <TabsTrigger value="all" className="relative" disabled={isLoading}>
            <span className="flex items-center gap-1">
              Todos
              {comments.length > 0 && (
                <Badge variant="outline">{comments.length}</Badge>
              )}
            </span>
            {activeTab === 'all' && (
              <motion.div
                className="absolute -bottom-[1px] left-0 h-[2px] bg-primary w-full"
                layoutId="activeTabIndicator"
              />
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-4xl text-primary"
              >
                <RiLoader4Line />
              </motion.div>
              <p className="text-muted-foreground">
                Carregando comentários pendentes...
              </p>
            </div>
          ) : pendingComments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="p-4 rounded-full bg-green-50 text-green-500 mb-3">
                <FaCheck size={24} />
              </div>
              <p className="text-muted-foreground">
                Não há comentários pendentes de aprovação.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {pendingComments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-4xl text-primary"
              >
                <RiLoader4Line />
              </motion.div>
              <p className="text-muted-foreground">
                Carregando comentários aprovados...
              </p>
            </div>
          ) : approvedComments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <p className="text-muted-foreground">
                Não há comentários aprovados.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {approvedComments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </TabsContent>

        <TabsContent value="all">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-4xl text-primary"
              >
                <RiLoader4Line />
              </motion.div>
              <p className="text-muted-foreground">
                Carregando todos os comentários...
              </p>
            </div>
          ) : comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <p className="text-muted-foreground">Não há comentários.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
