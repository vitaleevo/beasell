
import React from 'react';
import PageHero from './PageHero';
import { Mail, Phone, MapPin, Clock, MessageSquare, HeadphonesIcon } from 'lucide-react';

const ContactHero = () => {
  const contactMethods = [
    { 
      icon: Phone, 
      title: 'Telefone', 
      info: '+244 926 238 518',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    { 
      icon: MessageSquare, 
      title: 'WhatsApp', 
      info: 'Resposta Imediata',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    { 
      icon: Mail, 
      title: 'Email', 
      info: 'info@beasell.ao',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    { 
      icon: MapPin, 
      title: 'Localização', 
      info: 'Luanda, Talatona',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
  ];

  return (
    <PageHero
      title="Entre em Contacto"
      subtitle="Estamos Aqui para Ajudar"
      description="Pronto para transformar sua carreira ou equipa em vendas? Fale connosco e descubra como podemos impulsionar seus resultados comerciais."
      backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange text-white relative overflow-hidden min-h-[80vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-brand-orange/20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="group">
              <div className="bg-white/15 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                <div className={`bg-gradient-to-br ${method.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-center mb-2">{method.title}</h3>
                <p className="text-blue-200 text-sm text-center">{method.info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <HeadphonesIcon className="h-12 w-12 text-brand-orange mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">24h</div>
            <div className="text-blue-200 text-sm">Tempo Médio de Resposta</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <MessageSquare className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-200 text-sm">Taxa de Satisfação</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">8h-17h</div>
            <div className="text-blue-200 text-sm">Horário de Funcionamento</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-xl text-blue-200 mb-6">
            Transforme seus resultados comerciais hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Phone className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm font-medium">Atendimento Personalizado</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Mail className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm font-medium">Consultoria Gratuita</span>
            </div>
          </div>
        </div>
      </div>
    </PageHero>
  );
};

export default ContactHero;
