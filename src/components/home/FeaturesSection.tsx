
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Target,
      title: t('features.specialized_training'),
      description: t('features.specialized_training_desc')
    },
    {
      icon: Users,
      title: t('features.proven_experience'),
      description: t('features.proven_experience_desc')
    },
    {
      icon: Trophy,
      title: t('features.guaranteed_results'),
      description: t('features.guaranteed_results_desc')
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in staggered-animation-${index + 1}`}>
                <div className="bg-gradient-to-br from-blue-900 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <Link to="/servicos">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg hover:scale-105 transform transition-all duration-200">
              {t('features.see_all_services')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
