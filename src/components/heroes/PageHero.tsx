
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
    <section className={`pt-32 pb-24 relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {subtitle && (
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-8 ${
              backgroundImage 
                ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-brand-blue-100 to-brand-orange-100 text-brand-blue'
            }`}>
              {subtitle}
            </div>
          )}
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${
            backgroundImage ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h1>
          
          <p className={`text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto ${
            backgroundImage ? 'text-gray-200' : 'text-gray-600'
          }`}>
            {description}
          </p>
          
          {(ctaText || onCtaClick) && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange-700 text-white px-10 py-6 text-lg shadow-2xl hover:shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-1"
                onClick={onCtaClick}
              >
                {ctaText || 'Saiba Mais'}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          )}
          
          {children && (
            <div className="mt-16">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
