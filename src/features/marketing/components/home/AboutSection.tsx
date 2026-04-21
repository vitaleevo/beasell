
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Target, Award, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-blue-900 mb-6 leading-tight">
              Transformamos a Cultura de Vendas em <span className="text-brand-orange-500">Angola</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A Beasell nasceu da necessidade de elevar o padrão comercial no mercado angolano. Combinamos metodologias internacionais com um profundo conhecimento das dinâmicas locais para entregar resultados reais e sustentáveis.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-orange-500/10">
                  <Target className="h-5 w-5 text-brand-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-900">Missão</h4>
                  <p className="text-sm text-gray-500">Capacitar profissionais para a excelência.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <TrendingUp className="h-5 w-5 text-brand-blue-900" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-900">Visão</h4>
                  <p className="text-sm text-gray-500">Ser referência em formação comercial.</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-brand-blue-900 hover:bg-[#1A2A49]/90 text-white transition-transform hover:scale-105">
              <Link href="/sobre">
                Conhecer a Beasell
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="relative aspect-video lg:aspect-square">
            <Image
              src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
              alt="Equipa Beasell"
              fill
              className="rounded-2xl shadow-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#F39200] text-white p-4 rounded-xl shadow-xl z-10">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
