
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: "Mensagem Enviada!",
      description: "Entraremos em contacto consigo nas próximas 24 horas.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Localização",
      details: ["Luanda, Angola", "Zona empresarial da Talatona"],
      action: "Ver no Mapa"
    },
    {
      icon: Phone,
      title: "Telefone",
      details: ["+244 923 456 789", "+244 912 345 678"],
      action: "Ligar Agora"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@beasell.ao", "beatriz@beasell.ao"],
      action: "Enviar Email"
    },
    {
      icon: Clock,
      title: "Horário",
      details: ["Segunda - Sexta: 8h - 17h", "Sábado: 8h - 12h"],
      action: "Agendar Reunião"
    }
  ];

  const services = [
    "Formação Individual",
    "Formação Empresarial",
    "Workshop Intensivo",
    "Consultoria Comercial",
    "Mentoring Executivo",
    "Outro"
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Entre em <span className="text-blue-900">Contacto</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pronto para transformar suas vendas? Fale connosco e descubra como podemos ajudar a alcançar seus objetivos
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contacto</h3>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-blue-900 to-orange-500 p-3 rounded-lg mr-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                      <Button 
                        variant="link" 
                        className="text-blue-900 hover:text-orange-500 p-0 mt-2 text-sm"
                      >
                        {info.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* WhatsApp CTA */}
            <Card className="border-2 border-green-500 bg-green-50">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">WhatsApp Business</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Contacto directo e rápido para esclarecimentos
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Falar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Envie-nos uma Mensagem</CardTitle>
                <p className="text-gray-600">
                  Preencha o formulário abaixo e entraremos em contacto consigo num prazo de 24 horas
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+244 923 xxx xxx"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nome da empresa"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serviço de Interesse
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Conte-nos sobre seus objetivos e como podemos ajudar..."
                      rows={5}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Aceito a política de privacidade e autorizo o contacto *
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-900 to-orange-500 hover:from-blue-800 hover:to-orange-600 text-white py-4 text-lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Resposta Rápida</h4>
            <p className="text-gray-600 text-sm">Garantimos resposta em até 24 horas úteis</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Consulta Gratuita</h4>
            <p className="text-gray-600 text-sm">Primeira consulta sem custos ou compromissos</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Soluções Personalizadas</h4>
            <p className="text-gray-600 text-sm">Propostas adaptadas às suas necessidades específicas</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
