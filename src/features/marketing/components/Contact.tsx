"use client";

import React from 'react';
import ContactForm from '@/shared/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock, FileText, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const benefits = [
    "Resposta em menos de 24 horas",
    "Consultoria técnica especializada",
    "Soluções adaptadas ao mercado angolano",
    "Acompanhamento personalizado"
  ];

  return (
    <section id="fale-connosco" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Left Column: Information & Trust */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A2A49] mb-6 leading-tight">
                  Vamos falar sobre o seu <span className="text-[#F39200]">próximo nível</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  Preencha o formulário e nossa equipa de especialistas entrará em contacto para entender como a Beasell pode ajudar você ou sua empresa a vender mais e melhor.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border-none">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#1A2A49] p-8 rounded-[2rem] text-white shadow-xl">
                  <h4 className="text-[#F39200] font-bold text-xs uppercase tracking-widest mb-4">Escritório Central</h4>
                  <address className="not-italic text-sm leading-relaxed text-blue-100">
                    Rua Marechal Brós Tito Nº 35<br />
                    Edifício Skyone 4º andar<br />
                    Bairro Kinaxixi, Luanda
                  </address>
                </div>
                <div className="bg-white p-8 rounded-[2rem] text-[#1A2A49] shadow-xl border-none">
                  <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">Dados Fiscais</h4>
                  <div className="text-sm font-bold mb-1">BEASELL, LDA</div>
                  <div className="text-xs text-gray-500 font-medium">NIF: 5002528509</div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-none relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#F39200]"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#1A2A49] mb-8">Envie uma Mensagem</h3>
                  <ContactForm />
                </div>
              </div>

              {/* Support info below form */}
              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-6 bg-blue-50/50 rounded-2xl">
                  <Phone className="h-6 w-6 text-blue-600 mb-3" />
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Telefone</span>
                  <a href="tel:+244930010002" className="text-sm font-bold text-[#1A2A49] hover:text-[#F39200] transition-colors">(+244) 930 010 002</a>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-orange-50/50 rounded-2xl">
                  <Mail className="h-6 w-6 text-orange-600 mb-3" />
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email</span>
                  <a href="mailto:info@beasell.ao" className="text-sm font-bold text-[#1A2A49] hover:text-[#F39200] transition-colors">info@beasell.ao</a>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-green-50/50 rounded-2xl">
                  <Clock className="h-6 w-6 text-green-600 mb-3" />
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Horário</span>
                  <span className="text-sm font-bold text-[#1A2A49]">Seg-Sex: 8h-17h</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

