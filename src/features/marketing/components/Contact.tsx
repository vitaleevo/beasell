"use client";

import React from "react";
import ContactForm from "@/shared/components/forms/ContactForm";
import { Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const benefits = [
    "Resposta em menos de 24 horas",
    "Consultoria técnica especializada",
    "Soluções adaptadas ao mercado angolano",
    "Acompanhamento personalizado",
  ];

  return (
    <section id="fale-connosco" className="bg-[#f8fafc] py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-12">
            {/* Left Column: Information & Trust */}
            <div className="space-y-12 lg:col-span-5">
              <div>
                <h2 className="mb-6 text-3xl leading-tight font-extrabold text-[#1A2A49] md:text-5xl">
                  Vamos falar sobre o seu <span className="text-[#F39200]">próximo nível</span>
                </h2>
                <p className="text-lg leading-relaxed font-light text-gray-600">
                  Preencha o formulário e nossa equipa de especialistas entrará em contacto para
                  entender como a Beasell pode ajudar você ou sua empresa a vender mais e melhor.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border-none bg-white p-4 shadow-sm"
                  >
                    <div className="rounded-full bg-green-100 p-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-[#1A2A49] p-8 text-white shadow-xl">
                  <h4 className="mb-4 text-xs font-bold tracking-widest text-[#F39200] uppercase">
                    Escritório Central
                  </h4>
                  <address className="text-sm leading-relaxed text-blue-100 not-italic">
                    Rua Marechal Brós Tito Nº 35
                    <br />
                    Edifício Skyone 4º andar
                    <br />
                    Bairro Kinaxixi, Luanda
                  </address>
                </div>
                <div className="rounded-[2rem] border-none bg-white p-8 text-[#1A2A49] shadow-xl">
                  <h4 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Dados Fiscais
                  </h4>
                  <div className="mb-1 text-sm font-bold">BEASELL, LDA</div>
                  <div className="text-xs font-medium text-gray-500">NIF: 5002528509</div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7">
              <div className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white p-8 shadow-2xl md:p-12">
                <div className="absolute top-0 left-0 h-full w-2 bg-[#F39200]"></div>

                <div className="relative z-10">
                  <h3 className="mb-8 text-2xl font-bold text-[#1A2A49]">Envie uma Mensagem</h3>
                  <ContactForm />
                </div>
              </div>

              {/* Support info below form */}
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center rounded-2xl bg-blue-50/50 p-6 text-center">
                  <Phone className="mb-3 h-6 w-6 text-blue-600" />
                  <span className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Telefone
                  </span>
                  <a
                    href="tel:+244930010002"
                    className="text-sm font-bold text-[#1A2A49] transition-colors hover:text-[#F39200]"
                  >
                    (+244) 930 010 002
                  </a>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-orange-50/50 p-6 text-center">
                  <Mail className="mb-3 h-6 w-6 text-orange-600" />
                  <span className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Email
                  </span>
                  <a
                    href="mailto:info@beasell.ao"
                    className="text-sm font-bold text-[#1A2A49] transition-colors hover:text-[#F39200]"
                  >
                    info@beasell.ao
                  </a>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-green-50/50 p-6 text-center">
                  <Clock className="mb-3 h-6 w-6 text-green-600" />
                  <span className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">
                    Horário
                  </span>
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
