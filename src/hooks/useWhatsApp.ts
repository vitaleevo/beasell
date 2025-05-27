
import { useAdmin } from '@/context/AdminContext';

export const useWhatsApp = () => {
  const { state } = useAdmin();
  
  const openWhatsApp = (interest: string, name?: string) => {
    const whatsappNumber = state.contactSettings?.whatsappNumber || '+244926238518';
    
    const messages = {
      individual: `Olá! Tenho interesse na Formação Individual em Vendas.${name ? ` Meu nome é ${name}.` : ''}`,
      empresarial: `Olá! Gostaria de saber mais sobre Formação Empresarial para minha empresa.${name ? ` Meu nome é ${name}.` : ''}`,
      workshop: `Olá! Tenho interesse nos Workshops de vendas.${name ? ` Meu nome é ${name}.` : ''}`,
      consultoria: `Olá! Gostaria de contratar serviços de Consultoria.${name ? ` Meu nome é ${name}.` : ''}`,
      geral: `Olá! Gostaria de obter mais informações sobre os serviços da Beasell.${name ? ` Meu nome é ${name}.` : ''}`
    };
    
    const message = messages[interest as keyof typeof messages] || messages.geral;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return { openWhatsApp };
};
