
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { PlayCircle, Download, Award, Heart, Globe, Shield } from 'lucide-react';

const TrainingFeatures = () => {
  const features = [
    {
      icon: PlayCircle,
      title: "Aulas em Vídeo HD",
      description: "Conteúdo em alta qualidade com explicações práticas e dinâmicas"
    },
    {
      icon: Download,
      title: "Material Complementar",
      description: "PDFs, exercícios e ferramentas para aplicação imediata"
    },
    {
      icon: Award,
      title: "Certificado Reconhecido",
      description: "Certificação válida no mercado angolano e internacional"
    },
    {
      icon: Heart,
      title: "Suporte Personalizado",
      description: "Acompanhamento direto da instrutora Beatriz Chavier"
    },
    {
      icon: Globe,
      title: "Acesso Vitalício",
      description: "Estude no seu ritmo com acesso ilimitado ao conteúdo"
    },
    {
      icon: Shield,
      title: "Garantia 30 Dias",
      description: "Satisfação garantida ou devolvemos seu investimento"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que Escolher a Beasell?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma oferece uma experiência de aprendizado completa e resultados comprovados
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
