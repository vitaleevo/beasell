
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainingCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-orange-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comece Sua Jornada de Transformação Hoje!
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Junte-se a centenas de profissionais que já transformaram suas carreiras
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/aluno/login">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Acessar Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contacto">
              <Button size="lg" variant="outline" className="border-2 border-white px-8 py-4 text-lg font-semibold bg-orange-600 hover:bg-orange-500 text-slate-50">
                Falar com Consultor
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-blue-200">
            💳 Parcelamento disponível • 🛡️ Garantia de 30 dias • 🎓 Certificado incluso
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrainingCTA;
