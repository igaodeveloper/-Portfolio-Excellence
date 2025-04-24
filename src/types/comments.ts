export interface Comment {
  id: number;
  created_at: string;
  visitor_name: string;
  visitor_email: string | null;
  content: string;
  rating: number; // 1-5 stars
  emotion: string; // emoji identifier
  reply?: string;
  replied_at?: string;
  is_approved: boolean;
}

export interface CreateCommentDto {
  visitor_name: string;
  visitor_email?: string;
  content: string;
  rating: number;
  emotion: string;
}

export interface CommentReplyDto {
  reply: string;
}

export type EmotionType =
  | 'happy'
  | 'love'
  | 'surprised'
  | 'neutral'
  | 'thinking'
  | 'sad'
  | 'angry';

export const EMOTION_EMOJIS = {
  happy: '😀',
  love: '❤️',
  surprised: '😲',
  neutral: '😐',
  thinking: '🤔',
  sad: '😔',
  angry: '😠',
};
