
import { useAdmin } from '@/context/AdminContext';

export const useWhatsApp = () => {
  const { state } = useAdmin();
  
  const openWhatsApp = (interest: string, name?: string) => {
    const whatsappNumber = state.contactSettings?.whatsappNumber || '+244930010002';
    
    const messages = {
      'consultoria-gestao': `Olá! Tenho interesse na Consultoria em Gestão de Negócios da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      'treinamento-vendedores': `Olá! Gostaria de saber mais sobre Treinamento para Vendedores da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      'prospeccao-comercial': `Olá! Tenho interesse na Prospecção e Apoio Comercial da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      'formacoes-pequenos-negocios': `Olá! Gostaria de contratar Formações para Pequenos Negócios da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      individual: `Olá! Tenho interesse na Formação Individual em Vendas da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      empresarial: `Olá! Gostaria de saber mais sobre Formação Empresarial da Beasell para minha empresa.${name ? ` Meu nome é ${name}.` : ''}`,
      workshop: `Olá! Tenho interesse nos Workshops de vendas da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      consultoria: `Olá! Gostaria de contratar serviços de Consultoria da Beasell.${name ? ` Meu nome é ${name}.` : ''}`,
      geral: `Olá! Gostaria de obter mais informações sobre os serviços da Beasell.${name ? ` Meu nome é ${name}.` : ''}`
    };
    
    const message = messages[interest as keyof typeof messages] || messages.geral;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return { openWhatsApp };
};
