
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Download, Award, Heart, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const TrainingFeatures = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: PlayCircle,
      title: t('training.hd_video_classes'),
      description: t('training.hd_video_desc')
    },
    {
      icon: Download,
      title: t('training.complementary_material'),
      description: t('training.complementary_material_desc')
    },
    {
      icon: Award,
      title: t('training.recognized_certificate'),
      description: t('training.recognized_certificate_desc')
    },
    {
      icon: Heart,
      title: t('training.personalized_support'),
      description: t('training.personalized_support_desc')
    },
    {
      icon: Globe,
      title: t('training.lifetime_access'),
      description: t('training.lifetime_access_desc')
    },
    {
      icon: Shield,
      title: t('training.30_day_guarantee'),
      description: t('training.30_day_guarantee_desc')
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('training.why_choose_beasell')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('training.complete_learning')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingFeatures;
