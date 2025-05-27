
import { useState } from 'react';
import { ContactFormData } from '@/types/contact';
import { sendContactEmail } from '@/services/emailService';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, dispatch } = useAdmin();
  const { toast } = useToast();

  const submitContact = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const emailDestination = state.contactSettings?.emailDestination || 'info@beasell.ao';
      
      // Enviar email
      await sendContactEmail(data, emailDestination);
      
      // Salvar submissão no contexto admin
      const submission = {
        id: Date.now().toString(),
        data,
        timestamp: new Date().toISOString(),
        status: 'pending' as const
      };
      
      dispatch({ type: 'ADD_CONTACT_SUBMISSION', payload: submission });
      
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
