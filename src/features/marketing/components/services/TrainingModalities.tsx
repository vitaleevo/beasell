
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { MapPin, HeadphonesIcon, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface TrainingModalitiesProps {
  onAction: (serviceType: string) => void;
}

const TrainingModalities = ({ onAction }: TrainingModalitiesProps) => {
  const modalities = [
    {
      icon: MapPin,
      title: "Presencial",
      description: "Formações no nosso centro em Luanda ou nas suas instalações",
      gradient: 'from-[#F39200] to-amber-500',
      highlights: ['Interação directa', 'Prática imediata'],
    },
    {
      icon: HeadphonesIcon,
      title: "Online",
      description: "Sessões virtuais interactivas com a mesma qualidade",
      gradient: 'from-blue-500 to-cyan-500',
      highlights: ['Acesso remoto', 'Gravações incluídas'],
    },
    {
      icon: Users,
      title: "In-Company",
      description: "Formações customizadas na sua empresa",
      gradient: 'from-emerald-500 to-teal-500',
      highlights: ['Conteúdo personalizado', 'Equipa completa'],
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-[#1A2A49] to-[#0f1b33] rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#F39200]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Image Side */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
              alt="Formação prática em vendas"
              width={600}
              height={400}
              className="w-full h-56 sm:h-64 md:h-72 lg:h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A49]/60 via-transparent to-transparent"></div>

            {/* Floating stats card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[#1A2A49]">3 Modalidades</div>
                  <div className="text-sm text-gray-500">Adaptadas às suas necessidades</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-[#F39200] to-amber-500 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium mb-4 border border-white/15 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F39200] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F39200]"></span>
              </span>
              Escolha a sua modalidade
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Modalidades de{' '}
              <span className="text-[#F39200]">Formação</span>
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Escolha a modalidade que melhor se adapta às suas necessidades e agenda
            </p>
          </div>

          {/* Modality Cards */}
          <div className="space-y-4">
            {modalities.map((modality, index) => (
              <div key={index} className="group/card flex items-start p-4 sm:p-5 bg-white/[0.06] backdrop-blur-sm rounded-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.1] transition-all duration-300">
                <div className={`bg-gradient-to-br ${modality.gradient} p-3 rounded-xl mr-4 flex-shrink-0 group-hover/card:scale-110 transition-transform duration-300 shadow-lg`}>
                  <modality.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-base sm:text-lg mb-1">
                    {modality.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">
                    {modality.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {modality.highlights.map((hl, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-white/[0.08] text-gray-300 rounded-full border border-white/[0.08]">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-2 text-center lg:text-left">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#F39200] to-[#e08500] hover:from-[#d68000] hover:to-[#c77600] text-white py-3.5 px-8 text-base font-semibold rounded-xl shadow-lg shadow-orange-900/30 hover:shadow-xl transition-all duration-300 group/btn"
              onClick={() => onAction('modalidade')}
            >
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModalities;
