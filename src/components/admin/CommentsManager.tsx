import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaStar, FaCheck, FaTimes, FaReply } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';

import CommentsService from '../../services/comments';
import { Comment, EmotionType, EMOTION_EMOJIS } from '../../types/comments';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useToast } from '../ui/use-toast';
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
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
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

  useEffect(() => {
    loadAllComments();
  }, []);

  // Aprovar um comentário
  const approveComment = async (id: number) => {
    try {
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
        description: 'O comentário foi aprovado com sucesso!',
      });
    } catch (err) {
      console.error('Erro ao aprovar comentário:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível aprovar o comentário.',
        variant: 'destructive',
      });
    }
  };

  // Rejeitar um comentário
  const rejectComment = async (id: number) => {
    try {
      await CommentsService.reject(id);

      // Atualizar listas localmente
      const updatedPendingComments = pendingComments.filter((c) => c.id !== id);
      setPendingComments(updatedPendingComments);

      // Atualizar lista completa
      setComments([...updatedPendingComments, ...approvedComments]);

      toast({
        title: 'Comentário rejeitado',
        description: 'O comentário foi rejeitado e removido.',
      });
    } catch (err) {
      console.error('Erro ao rejeitar comentário:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível rejeitar o comentário.',
        variant: 'destructive',
      });
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

    return (
      <Card
        className={`overflow-hidden border shadow-sm mb-4 transition-all duration-300 ${isPending ? 'border-yellow-300 bg-yellow-50/5' : ''}`}
      >
        <CardHeader className="pb-2 px-4 md:px-6 flex flex-row items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.visitor_name}`}
            />
            <AvatarFallback>
              {comment.visitor_name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold">
                  {comment.visitor_name}
                  <span className="ml-2 text-xl">
                    {EMOTION_EMOJIS[comment.emotion as EmotionType]}
                  </span>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => approveComment(comment.id)}
                  >
                    <FaCheck className="mr-1" /> Aprovar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => rejectComment(comment.id)}
                  >
                    <FaTimes className="mr-1" /> Rejeitar
                  </Button>
                </div>
              )}
            </div>

            {comment.visitor_email && (
              <p className="text-xs text-muted-foreground mt-1">
                {comment.visitor_email}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-4 md:px-6 py-3">
          <p className="text-sm">{comment.content}</p>
        </CardContent>

        {comment.reply ? (
          <CardFooter className="bg-primary-50 border-t px-4 md:px-6 py-3">
            <div className="flex items-start gap-3 w-full">
              <FaReply className="text-primary mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-primary mb-1">
                  Sua resposta:
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
        ) : (
          <CardFooter className="px-4 md:px-6 py-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setSelectedComment(comment)}
            >
              <FaReply className="mr-2" /> Responder
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Comentários</h2>
        <p className="text-muted-foreground">
          Aprove, rejeite ou responda aos comentários dos visitantes.
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="relative">
            Pendentes
            {pendingComments.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {pendingComments.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : pendingComments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Não há comentários pendentes de aprovação.
            </p>
          ) : (
            <div className="space-y-4">
              {pendingComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : approvedComments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Não há comentários aprovados.
            </p>
          ) : (
            <div className="space-y-4">
              {approvedComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Não há comentários.
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog
        open={selectedComment !== null}
        onOpenChange={(open) => !open && setSelectedComment(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Responder ao comentário</DialogTitle>
            <DialogDescription>
              Escreva uma resposta para o comentário de{' '}
              <span className="font-medium">
                {selectedComment?.visitor_name}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          {selectedComment && (
            <div className="bg-muted/30 p-3 rounded-md text-sm mb-4">
              <p className="font-medium">Comentário original:</p>
              <p className="mt-1">{selectedComment.content}</p>
            </div>
          )}

          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Escreva sua resposta aqui..."
            className="min-h-[120px]"
          />

          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSelectedComment(null);
                setReplyText('');
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!replyText.trim() || isSubmittingReply}
              onClick={submitReply}
            >
              {isSubmittingReply ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <FaReply className="mr-2" /> Enviar resposta
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
