
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const CoursesSection = () => {
  const { t } = useLanguage();

  const courses = [
    {
      title: t('courses.advanced_sales'),
      duration: `40 ${t('courses.duration')}`,
      price: "150.000 Kz",
      description: t('courses.advanced_sales_desc'),
      highlights: [t('courses.client_psychology'), t('courses.persuasion_techniques'), t('courses.objection_handling')]
    },
    {
      title: t('courses.commercial_leadership'),
      duration: `32 ${t('courses.duration')}`,
      price: "120.000 Kz",
      description: t('courses.commercial_leadership_desc'),
      highlights: [t('courses.team_management'), t('courses.motivation'), t('courses.goal_setting')]
    },
    {
      title: t('courses.customer_service'),
      duration: `24 ${t('courses.duration')}`,
      price: "80.000 Kz",
      description: t('courses.customer_service_desc'),
      highlights: [t('courses.effective_communication'), t('courses.conflict_resolution'), t('courses.customer_loyalty')]
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('courses.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('courses.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <Card key={index} className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in staggered-animation-${index + 1}`}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-blue-900">{course.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="text-orange-500 font-bold text-lg">{course.price}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2 mb-6">
                  {course.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-blue-900 hover:bg-blue-800">
                  {t('courses.know_more')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <Link to="/servicos">
            <Button size="lg" variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
              {t('courses.see_all_courses')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
