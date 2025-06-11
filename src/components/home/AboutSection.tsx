
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Award, Heart, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
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
                Conheça a <span className="text-orange-500">Beasell</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Empresa especialista em consultoria e formação comercial com mais de 5 anos transformando negócios em Angola
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Metodologia Comprovada</h3>
                  <p className="text-gray-600">Técnicas adaptadas ao mercado angolano com resultados garantidos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Experiência Local</h3>
                  <p className="text-gray-600">Fundada por Beatriz Xavier, especialista com mais de 10 anos no mercado</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Foco em PMEs</h3>
                  <p className="text-gray-600">Especializada em pequenos e médios empreendedores angolanos</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/sobre" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Conhecer a Beasell
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contacto" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                  Agendar Consulta
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
