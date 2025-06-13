
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Sobre a <span className="text-orange-500">Beasell</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Especialistas em formação comercial e consultoria empresarial
              </p>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              A Beasell é uma empresa angolana dedicada à consultoria em gestão de negócios, 
              com foco no apoio a pequenos empreendedores, equipas comerciais e organizações 
              em fase de estruturação ou crescimento.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Profissionais Formados</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Satisfação</div>
              </div>
            </div>

            <Link to="/sobre">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white">
                Conhecer a Beasell
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <img
              src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
              alt="Equipa Beasell"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-xl shadow-xl">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
