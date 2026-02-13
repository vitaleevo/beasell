
import React from 'react';
import { Button } from '@/shared/components/ui/button';
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
  const heroStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <section className={`pt-20 pb-12 relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <div className="absolute inset-0" style={heroStyle}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center my-[100px]">
          {subtitle && (
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${backgroundImage ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' : 'bg-gradient-to-r from-brand-blue-100 to-brand-orange-100 text-brand-blue'}`}>
              {subtitle}
            </div>
          )}
          
          <h1 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${backgroundImage ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>
          
          <p className={`text-base md:text-lg lg:text-xl mb-6 leading-relaxed max-w-3xl mx-auto ${backgroundImage ? 'text-gray-200' : 'text-gray-600'}`}>
            {description}
          </p>
          
          {(ctaText || onCtaClick) && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange-700 text-white px-6 py-3 text-base shadow-2xl hover:shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-1" onClick={onCtaClick}>
                {ctaText || 'Saiba Mais'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
          
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
