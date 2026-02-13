"use client"

import { useState, useContext } from 'react';
import { ContactFormData } from '@/shared/types/contact';
import { sendContactEmail } from '@/shared/services/emailService';
import { AdminContext } from '@/shared/context/AdminContext';
import { useToast } from '@/shared/hooks/use-toast';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Obter o contexto admin de forma segura (pode ser null se estiver fora do AdminProvider)
  const adminContext = useContext(AdminContext);

  const submitContact = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const emailDestination = adminContext?.state?.contactSettings?.emailDestination || 'info@beasell.ao';

      // Enviar email
      await sendContactEmail(data, emailDestination);

      // Salvar submissão no contexto admin apenas se estiver disponível
      if (adminContext) {
        const submission = {
          id: Date.now().toString(),
          data,
          timestamp: new Date().toISOString(),
          status: 'pending' as const
        };
        adminContext.dispatch({ type: 'ADD_CONTACT_SUBMISSION', payload: submission });
      }

      toast({
        title: 'Mensagem Enviada!',
        description: 'Obrigado pelo seu contacto. Responderemos em breve.',
      });

      return { success: true };
    } catch (error) {
      console.error('Erro ao enviar contacto:', error);
      toast({
        title: 'Erro no Envio',
        description: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.',
        variant: 'destructive',
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitContact, isSubmitting };
};

