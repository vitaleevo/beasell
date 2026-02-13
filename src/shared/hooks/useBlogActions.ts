
import { useBlog } from '@/shared/context/BlogContext';
import { BlogPost } from '@/shared/types/blog';
import { useToast } from '@/shared/hooks/use-toast';

export const useBlogActions = () => {
  const { state, dispatch } = useBlog();
  const { toast } = useToast();

  const createPost = (postData: Omit<BlogPost, '_id'>) => {
    const newPost: BlogPost = {
      ...postData,
      _id: Date.now().toString(),
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    toast({
      title: 'Artigo criado',
      description: 'O artigo foi criado com sucesso.',
    });
  };

  const updatePost = (post: BlogPost) => {
    dispatch({ type: 'UPDATE_POST', payload: post });
    toast({
      title: 'Artigo atualizado',
      description: 'O artigo foi atualizado com sucesso.',
    });
  };

  const deletePost = (postId: string) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
    toast({
      title: 'Artigo removido',
      description: 'O artigo foi removido com sucesso.',
    });
  };

  const searchPosts = (query: string) => {
    return state.posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getPostBySlug = (slug: string) => {
    return state.posts.find(post => post.slug === slug);
  };

  const getPostsByCategory = (category: string) => {
    return state.posts.filter(post => post.category === category);
  };

  const getFeaturedPosts = () => {
    return state.posts.filter(post => post.isFeatured && post.isPublished);
  };

  return {
    posts: state.posts,
    categories: state.categories,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    getPostBySlug,
    getPostsByCategory,
    getFeaturedPosts,
  };
};

