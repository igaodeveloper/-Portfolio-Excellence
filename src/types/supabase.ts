export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: number
          created_at: string
          name: string
          email: string
          message: string
          read: boolean
          replied: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          email: string
          message: string
          read?: boolean
          replied?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          email?: string
          message?: string
          read?: boolean
          replied?: boolean
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: number
          created_at: string
          title: string
          description: string
          image_url: string
          tags: string[]
          live_url: string | null
          github_url: string | null
          featured: boolean
          order: number
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          description: string
          image_url: string
          tags: string[]
          live_url?: string | null
          github_url?: string | null
          featured?: boolean
          order?: number
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          description?: string
          image_url?: string
          tags?: string[]
          live_url?: string | null
          github_url?: string | null
          featured?: boolean
          order?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'admin' | 'user'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user'
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
