
import React from 'react';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock, FileText } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contacto" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-brand-blue-100 to-brand-orange-100 text-brand-blue px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            💬 Vamos Conversar
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Pronto para <span className="text-brand-blue">Transformar</span> seu Negócio?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Entre em contacto connosco e descubra como podemos impulsionar seu negócio ou equipa com consultoria e formação de excelência.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Informações de Contacto</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Endereço</h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">
                      Rua Marechal Brós Tito Nº 35<br />
                      Edifício Skyone 4º andar<br />
                      Município de Ingombota, Bairro Kinaxixi<br />
                      Luanda-Angola
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Telefone</h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">(244) 930 010 002</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">info@beasell.ao</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Horário de Atendimento</h4>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">
                      Segunda - Sexta: 08:00 - 17:00<br />
                      Sábado: 08:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl lg:rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex items-center mb-3 sm:mb-4">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold">BEASELL - FORMAÇÃO E CONSULTORIA, LDA</h3>
              </div>
              <div className="text-blue-100 text-xs sm:text-sm space-y-1">
                <p><strong>NIF:</strong> 5002528509</p>
                <p className="mt-2 sm:mt-3 leading-relaxed">
                  Empresa angolana dedicada a consultoria em gestão de negócios, 
                  com foco no apoio a pequenos empreendedores, equipas comerciais 
                  e organizações em fase de estruturação ou crescimento.
                </p>
                <p className="mt-2 sm:mt-3 font-medium">
                  Serviços orientados para resultados práticos e acompanhamento de proximidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
