
import React from 'react';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock, FileText } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contacto" className="py-6 sm:py-8 lg:py-12 xl:py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-brand-blue-100 to-brand-orange-100 text-brand-blue px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            💬 Vamos Conversar
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Pronto para <span className="text-brand-blue">Transformar</span> seu Negócio?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
            Entre em contacto com a Beasell e descubra como podemos impulsionar seu negócio ou equipa com consultoria e formação de excelência.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Informações de Contacto</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Endereço</h4>
                    <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base leading-relaxed">
                      Rua Marechal Brós Tito Nº 35<br />
                      Edifício Skyone 4º andar<br />
                      Município de Ingombota, Bairro Kinaxixi<br />
                      Luanda-Angola
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Telefone</h4>
                    <a 
                      href="tel:+244930010002" 
                      className="text-gray-600 hover:text-green-600 mt-1 text-xs sm:text-sm lg:text-base transition-colors"
                    >
                      (+244) 930 010 002
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
                    <a 
                      href="mailto:info@beasell.ao" 
                      className="text-gray-600 hover:text-orange-600 mt-1 text-xs sm:text-sm lg:text-base transition-colors"
                    >
                      info@beasell.ao
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Horário de Atendimento</h4>
                    <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base leading-relaxed">
                      Segunda - Sexta: 08:00 - 17:00<br />
                      Sábado: 08:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
              <div className="flex items-center mb-3 sm:mb-4">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-base sm:text-lg lg:text-xl font-bold">BEASELL - FORMAÇÃO E CONSULTORIA, LDA</h3>
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

            {/* Quick Contact Actions - Mobile Only */}
            <div className="lg:hidden space-y-3">
              <a 
                href="tel:+244930010002"
                className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors touch-manipulation"
              >
                <Phone className="h-5 w-5 mr-2" />
                Ligar Agora
              </a>
              <a 
                href="https://wa.me/244930010002"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors touch-manipulation"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
