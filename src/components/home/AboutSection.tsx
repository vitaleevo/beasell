
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Award, Heart, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const AboutSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('about.proven_methodology'),
      description: t('about.proven_methodology_desc')
    },
    {
      icon: Globe,
      title: t('about.local_experience'),
      description: t('about.local_experience_desc')
    },
    {
      icon: Heart,
      title: t('about.sme_focus'),
      description: t('about.sme_focus_desc')
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Beasell - Consultoria e Formação" 
                className="w-full rounded-2xl shadow-2xl" 
              />
              <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-xl shadow-xl">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('about.title')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                {t('about.description')}
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/sobre" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  {t('about.know_beasell')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contacto" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                  {t('about.schedule_consultation')}
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
