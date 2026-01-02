// Types utilisateur
export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: 'member' | 'oustaze' | 'association' | 'admin';
  is_verified: boolean;
  subscription_status: 'active' | 'expired' | 'pending';
  subscription_end_date?: string;
  created_at: string;
  updated_at: string;
}

// Types Association
export interface Association {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  is_verified: boolean;
  members_count: number;
  contents_count: number;
  created_at: string;
}

// Types Oustaze
export interface Oustaze {
  id: number;
  user_id: number;
  user: User;
  association_id: number;
  association: Association;
  bio?: string;
  specialties: string[];
  is_available: boolean;
  questions_answered: number;
}

// Types Contenu
export interface Content {
  id: number;
  title: string;
  slug: string;
  description?: string;
  type: 'audio' | 'video';
  category: Category;
  association: Association;
  oustaze?: Oustaze;
  thumbnail?: string;
  media_url: string;
  duration: number; // en secondes
  views_count: number;
  likes_count: number;
  is_premium: boolean;
  published_at: string;
  created_at: string;
}

// Types Catégorie
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  contents_count: number;
}

// Types Événement
export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  association: Association;
  location: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  start_date: string;
  end_date?: string;
  thumbnail?: string;
  is_online: boolean;
  meeting_url?: string;
  max_participants?: number;
  participants_count: number;
  is_free: boolean;
  price?: number;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  created_at: string;
}

// Types Question
export interface Question {
  id: number;
  user: User;
  oustaze?: Oustaze;
  title: string;
  content: string;
  category: Category;
  is_anonymous: boolean;
  is_public: boolean;
  status: 'pending' | 'answered' | 'closed';
  answer?: Answer;
  created_at: string;
  updated_at: string;
}

export interface Answer {
  id: number;
  question_id: number;
  oustaze: Oustaze;
  content: string;
  audio_url?: string;
  video_url?: string;
  created_at: string;
}

// Types Paiement
export interface Payment {
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  provider: 'wave' | 'orange_money' | 'free_money';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference: string;
  subscription_type: 'monthly' | 'yearly';
  created_at: string;
}

// Types API Response
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Types Auth
export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface OtpVerification {
  phone: string;
  otp: string;
}
