
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-900 to-orange-500 text-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Pronto para Transformar o Seu Negócio com a Beasell?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-blue-100">
            Junte-se a centenas de empresas que já transformaram seus negócios através da nossa consultoria especializada
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/contacto" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/servicos" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-2 border-white text-white hover:text-blue-900 px-8 py-4 text-lg font-semibold bg-gray-300 hover:bg-gray-200">
                Ver Serviços
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(244) 930 010 002</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@beasell.ao</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Luanda, Angola</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
