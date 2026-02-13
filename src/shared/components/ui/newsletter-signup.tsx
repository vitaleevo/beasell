"use client";


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useToast } from '@/shared/hooks/use-toast';
import { Mail, CheckCircle } from 'lucide-react';
import LoadingSpinner from './loading-spinner';

const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  showName?: boolean;
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  showName = false,
  className = '',
  placeholder = 'Seu email',
  buttonText = 'Subscrever'
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio para newsletter
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Salvar no localStorage para demonstração
      const newsletters = JSON.parse(localStorage.getItem('beasell-newsletters') || '[]');
      newsletters.push({
        ...data,
        subscribedAt: new Date().toISOString()
      });
      localStorage.setItem('beasell-newsletters', JSON.stringify(newsletters));
      
      setIsSubscribed(true);
      toast({
        title: 'Subscrição Realizada!',
        description: 'Obrigado por se juntar à nossa newsletter.',
      });
      
      reset();
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
      
    } catch (error) {
      toast({
        title: 'Erro na Subscrição',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`flex items-center justify-center space-x-2 text-green-600 ${className}`}>
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Subscrito com sucesso!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-3 ${className}`}>
      {showName && (
        <div>
          <Input
            placeholder="Seu nome"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
      )}
      
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            type="email"
            placeholder={placeholder}
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              {buttonText}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterSignup;


