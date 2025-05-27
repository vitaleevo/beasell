
import { ContactFormData } from '@/types/contact';

export const sendContactEmail = async (data: ContactFormData, emailDestination: string) => {
  // Simulação de envio de email - em produção, integrar com EmailJS ou similar
  console.log('Enviando email para:', emailDestination);
  console.log('Dados do contacto:', data);
  
  // Simular delay de envio
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulação de sucesso (95% de taxa de sucesso)
  if (Math.random() > 0.05) {
    return { success: true, message: 'Email enviado com sucesso!' };
  } else {
    throw new Error('Falha no envio do email. Tente novamente.');
  }
};

export const formatContactEmail = (data: ContactFormData) => {
  const interestLabels = {
    individual: 'Formação Individual',
    empresarial: 'Formação Empresarial', 
    workshop: 'Workshop',
    consultoria: 'Consultoria',
    geral: 'Informações Gerais'
  };

  return {
    subject: `Nova mensagem de contacto - ${data.name}`,
    body: `
      Nome: ${data.name}
      Email: ${data.email}
      Telefone: ${data.phone || 'Não informado'}
      Interesse: ${interestLabels[data.interest]}
      
      Mensagem:
      ${data.message}
      
      ---
      Enviado em: ${new Date().toLocaleString('pt-AO')}
    `
  };
};
