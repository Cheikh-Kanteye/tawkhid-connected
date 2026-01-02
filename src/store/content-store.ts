import { create } from 'zustand';
import type { Content, Category } from '@/types';

interface ContentFilters {
  type?: 'audio' | 'video';
  category?: string;
  association?: string;
  search?: string;
}

interface ContentState {
  contents: Content[];
  categories: Category[];
  currentContent: Content | null;
  filters: ContentFilters;
  isLoading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;

  // Actions
  setContents: (contents: Content[]) => void;
  setCategories: (categories: Category[]) => void;
  setCurrentContent: (content: Content | null) => void;
  setFilters: (filters: Partial<ContentFilters>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (data: { currentPage: number; totalPages: number; perPage: number; total: number }) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  contents: [],
  categories: [],
  currentContent: null,
  filters: {},
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  perPage: 12,
  total: 0,

  setContents: (contents) => set({ contents }),

  setCategories: (categories) => set({ categories }),

  setCurrentContent: (content) => set({ currentContent: content }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      currentPage: 1, // Reset page when filters change
    })),

  clearFilters: () => set({ filters: {}, currentPage: 1 }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setPagination: (data) =>
    set({
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      perPage: data.perPage,
      total: data.total,
    }),
}));
