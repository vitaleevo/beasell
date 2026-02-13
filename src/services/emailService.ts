export const sendContactEmail = async (data: any, destination: string) => {
    // Simulação de envio de email
    console.log('Enviando email para:', destination);
    console.log('Dados do contacto:', data);

    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
};
