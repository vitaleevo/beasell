
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface WhatsAppButtonProps {
  interest?: string;
  name?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'secondary';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  interest = 'geral',
  name,
  className = '',
  size = 'default',
  variant = 'default'
}) => {
  const { openWhatsApp } = useWhatsApp();

  const handleClick = () => {
    openWhatsApp(interest, name);
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant={variant}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Contactar via WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
