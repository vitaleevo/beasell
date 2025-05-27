
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  onCtaClick,
  className = "",
  children
}) => {
  return (
    <section className={`pt-24 pb-16 relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              {subtitle}
            </div>
          )}
          
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
            backgroundImage ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h1>
          
          <p className={`text-xl mb-8 leading-relaxed ${
            backgroundImage ? 'text-gray-200' : 'text-gray-600'
          }`}>
            {description}
          </p>
          
          {(ctaText || onCtaClick) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                onClick={onCtaClick}
              >
                {ctaText || 'Saiba Mais'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
          
          {children && (
            <div className="mt-12">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
