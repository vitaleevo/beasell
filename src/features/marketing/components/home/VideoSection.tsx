import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  LineChart,
  MessageCircle,
  Target,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const VideoSection = () => {
  const features = [
    "Técnicas adaptadas ao mercado angolano",
    "Exercícios práticos para equipas comerciais",
    "Acompanhamento pós-formação",
    "Certificação e progresso dentro da plataforma",
  ];

  const steps = [
    {
      title: "Diagnóstico",
      description: "Identificamos bloqueios no processo comercial e nas rotinas da equipa.",
      icon: ClipboardCheck,
    },
    {
      title: "Treino aplicado",
      description: "Transformamos cada módulo em scripts, simulações e tarefas de campo.",
      icon: Target,
    },
    {
      title: "Evolução medida",
      description: "Acompanhamos inscrições, aulas, conclusões e resultados no backoffice.",
      icon: LineChart,
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-7xl text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Metodologia Beasell na prática
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            O MVP já liga a formação, o acompanhamento do aluno e a gestão do professor em um fluxo
            simples para vender, aprender e medir evolução.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-5 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
              <div>
                <p className="text-brand-orange-500 text-sm font-semibold tracking-wide uppercase">
                  Sistema comercial
                </p>
                <h3 className="text-brand-blue-900 mt-2 text-2xl font-bold">
                  Da aula ao resultado
                </h3>
              </div>
              <div className="bg-brand-blue-900 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                <LineChart className="h-6 w-6" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {["Curso", "Progresso", "Backoffice"].map((item) => (
                <div key={item} className="rounded-xl bg-white px-3 py-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-500">{item}</p>
                  <p className="text-brand-blue-900 mt-1 text-lg font-bold">Ativo</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {steps.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <div className="bg-brand-orange-500/10 text-brand-orange-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue-900 font-bold">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Formação que sai da teoria e entra na rotina de vendas
            </h3>
            <p className="text-base text-gray-600 sm:text-lg">
              A Beasell combina conteúdo, prática e acompanhamento para que o dono ou professor
              consiga publicar cursos, gerir alunos e acompanhar progresso sem depender de planilhas
              soltas.
            </p>

            <div className="space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-brand-orange-500 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-orange-500 text-white hover:bg-[#d68000]"
              >
                <Link href="/plataforma/cursos">
                  Ver cursos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-blue-900 text-brand-blue-900 hover:bg-brand-blue-50"
              >
                <Link href="/contacto">
                  Falar com a equipa
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
