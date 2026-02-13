
import React from 'react';
import { Button, ButtonProps } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import LoadingSpinner from './loading-spinner';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  icon?: React.ReactNode;
  hoverEffect?: 'scale' | 'glow' | 'slide' | 'none';
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  loading = false,
  icon,
  hoverEffect = 'scale',
  className,
  disabled,
  ...props
}) => {
  const hoverEffects = {
    scale: 'hover:scale-105 transform transition-all duration-200',
    glow: 'hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300',
    slide: 'hover:translate-y-[-2px] transition-all duration-200',
    none: ''
  };

  return (
    <Button
      className={cn(
        hoverEffects[hoverEffect],
        'relative overflow-hidden',
        loading && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      <div className={cn(
        'flex items-center space-x-2',
        loading && 'opacity-0'
      )}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </Button>
  );
};

export default EnhancedButton;

