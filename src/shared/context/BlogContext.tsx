
"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { BlogPost, BlogCategory, BlogSearchFilters } from '@/shared/types/blog';

interface BlogState {
  posts: BlogPost[];
  categories: BlogCategory[];
  searchFilters: BlogSearchFilters;
  loading: boolean;
  error: string | null;
}

type BlogAction =
  | { type: 'SET_POSTS'; payload: BlogPost[] }
  | { type: 'ADD_POST'; payload: BlogPost }
  | { type: 'UPDATE_POST'; payload: BlogPost }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: BlogCategory[] }
  | { type: 'SET_SEARCH_FILTERS'; payload: Partial<BlogSearchFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: BlogState = {
  posts: [],
  categories: [],
  searchFilters: { query: '', category: '', tag: '' },
  loading: false,
  error: null,
};

const mockPosts: BlogPost[] = [
  {
    _id: '1',
    title: '5 Técnicas de Vendas que Funcionam no Mercado Angolano',
    slug: '5-tecnicas-vendas-mercado-angolano',
    excerpt: 'Descubra as estratégias mais eficazes para vender no contexto empresarial angolano.',
    content: `# 5 Técnicas de Vendas que Funcionam no Mercado Angolano

O mercado angolano apresenta características únicas que exigem abordagens específicas...`,
    author: 'Beatriz Chavier',
    publishedAt: new Date('2024-11-15').getTime(),
    readTime: '5 min',
    category: 'Técnicas de Vendas',
    tags: ['vendas', 'angola', 'estratégias'],
    image: '/lovable-uploads/0f26bbc2-4602-4f2a-9463-fdbec24a219c.png',
    isPublished: true,
    isFeatured: true,
  },
  {
    _id: '2',
    title: 'Como Superar Objeções de Preço em Tempos Difíceis',
    slug: 'superar-objecoes-preco-tempos-dificeis',
    excerpt: 'Estratégias práticas para lidar com resistências de preço.',
    content: `# Como Superar Objeções de Preço em Tempos Difíceis

Em momentos económicos desafiantes, as objeções de preço tornam-se mais frequentes...`,
    author: 'Beatriz Chavier',
    publishedAt: new Date('2024-11-10').getTime(),
    readTime: '7 min',
    category: 'Gestão de Objeções',
    tags: ['objeções', 'preço', 'negociação'],
    image: '/lovable-uploads/edf977c0-1468-4d0e-8889-3ded3ae4f4fa.png',
    isPublished: true,
  },
  {
    _id: '3',
    title: 'Vendas Consultivas: O Futuro do Sector Comercial',
    slug: 'vendas-consultivas-futuro-sector-comercial',
    excerpt: 'Aprenda como a abordagem consultiva pode revolucionar seus resultados.',
    content: `# Vendas Consultivas: O Futuro do Sector Comercial

A venda consultiva representa uma mudança fundamental na forma como abordamos...`,
    author: 'Beatriz Chavier',
    publishedAt: new Date('2024-11-05').getTime(),
    readTime: '6 min',
    category: 'Vendas Consultivas',
    tags: ['consultiva', 'relacionamento', 'futuro'],
    image: '/lovable-uploads/fefff98b-a12c-4507-aa3f-9771c4fdb416.png',
    isPublished: true,
  },
];

const mockCategories: BlogCategory[] = [
  { id: '1', name: 'Técnicas de Vendas', slug: 'tecnicas-vendas', count: 15 },
  { id: '2', name: 'Gestão de Objeções', slug: 'gestao-objecoes', count: 8 },
  { id: '3', name: 'Vendas Consultivas', slug: 'vendas-consultivas', count: 12 },
  { id: '4', name: 'Liderança Comercial', slug: 'lideranca-comercial', count: 6 },
];

const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const BlogContext = createContext<{
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
} | null>(null);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  useEffect(() => {
    // Load initial data
    const savedPosts = localStorage.getItem('beasell-blog-posts');
    if (savedPosts) {
      dispatch({ type: 'SET_POSTS', payload: JSON.parse(savedPosts) });
    } else {
      dispatch({ type: 'SET_POSTS', payload: mockPosts });
    }

    dispatch({ type: 'SET_CATEGORIES', payload: mockCategories });
  }, []);

  useEffect(() => {
    // Save posts to localStorage whenever they change
    localStorage.setItem('beasell-blog-posts', JSON.stringify(state.posts));
  }, [state.posts]);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
