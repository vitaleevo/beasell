"use client";


import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';

const WhatsAppEnhanced = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { openWhatsApp } = useWhatsApp();

  const quickMessages = [
    'Quero saber mais sobre os cursos de vendas',
    'Gostaria de uma cotação para formação empresarial',
    'Tenho interesse nos workshops intensivos',
    'Quero agendar uma consulta'
  ];

  const handleQuickMessage = (quickMsg: string) => {
    setMessage(quickMsg);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      openWhatsApp(message);
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            size="lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-80 shadow-2xl border-0">
            <CardHeader className="bg-green-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">WhatsApp</CardTitle>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-green-600 p-1 h-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-green-100">
                Como podemos ajudar?
              </p>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              {/* Quick Messages */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Mensagens rápidas:</p>
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(quickMsg)}
                    className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>
              
              {/* Custom Message */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Ou escreva sua mensagem:</p>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar via WhatsApp
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default WhatsAppEnhanced;


