
import React from 'react';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contacto" className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-brand-blue-100 to-brand-orange-100 text-brand-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💬 Vamos Conversar
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pronto para <span className="text-brand-blue">Transformar</span> seu Negócio?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entre em contacto connosco e descubra como podemos impulsionar seu negócio ou equipa com consultoria e formação de excelência.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <p className="text-gray-600 mt-1">
                      Rua Marechal Brós Tito Nº 35<br />
                      Edifício Skyone 4º andar<br />
                      Município de Ingombota, Bairro Kinaxixi<br />
                      Luanda-Angola
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600 mt-1">+244 930 010 002</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">info@beasell.ao</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Horário de Atendimento</h4>
                    <p className="text-gray-600 mt-1">
                      Segunda - Sexta: 08:00 - 17:00<br />
                      Sábado: 08:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">BEASELL - FORMAÇÃO E CONSULTORIA, LDA</h3>
              <p className="text-blue-100 text-sm">
                <strong>NIF:</strong> 5002528509<br />
                Empresa angolana dedicada a consultoria em gestão de negócios, 
                com foco no apoio a pequenos empreendedores, equipas comerciais 
                e organizações em crescimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
