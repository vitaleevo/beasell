import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Handshake, Target } from "lucide-react";
import JsonLd from "@/shared/components/seo/JsonLd";
import {
    breadcrumbJsonLd,
    buildPageMetadata,
    serviceCatalogJsonLd,
    webPageJsonLd,
} from "@/shared/lib/seo";

const title = "Vendas em Angola | Consultoria, Formacao e Crescimento Comercial";
const description =
    "Guia da Beasell para empresas que querem vender mais em Angola com estrategia comercial, treinamento de vendedores, prospeccao e atendimento ao cliente.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/vendas-angola",
    keywords: [
        "vendas em angola",
        "como vender mais em angola",
        "estrategia comercial angola",
        "consultoria de vendas luanda",
        "formacao para vendedores angola",
    ],
});

const pillars = [
    {
        icon: Target,
        title: "Prospecção com foco",
        text: "Mapeamos segmentos, perfis de cliente, canais e mensagens para gerar oportunidades comerciais com mais previsibilidade.",
    },
    {
        icon: Handshake,
        title: "Venda consultiva",
        text: "Ajudamos a equipa a diagnosticar necessidades, conduzir conversas comerciais e fechar propostas com valor claro.",
    },
    {
        icon: BarChart3,
        title: "Gestão de performance",
        text: "Definimos indicadores, rotina comercial, acompanhamento e melhoria contínua para transformar esforço em resultado.",
    },
];

const topics = [
    "Treinamento de vendedores em Luanda e outras províncias",
    "Consultoria comercial para pequenas e médias empresas",
    "Scripts de abordagem, WhatsApp, e-mail e propostas comerciais",
    "Atendimento ao cliente, fidelização e recuperação de oportunidades",
    "Funil de vendas, metas, indicadores e acompanhamento de equipas",
];

export default function SalesAngolaPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/vendas-angola",
                        about: [
                            "vendas em Angola",
                            "consultoria comercial",
                            "formacao de vendedores",
                            "prospeccao comercial",
                        ],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Vendas em Angola", path: "/vendas-angola" },
                    ]),
                    serviceCatalogJsonLd(),
                ]}
            />

            <section className="relative min-h-[76vh] overflow-hidden bg-[#1A2A49] text-white">
                <Image
                    src="/lovable-uploads/bacd7dcc-ddf2-4bc3-a457-125fa18b7f04.png"
                    alt="Equipa comercial a planear vendas em Angola"
                    fill
                    priority
                    className="object-cover opacity-30"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-[#1A2A49]/80" />
                <div className="container relative z-10 mx-auto flex min-h-[76vh] items-center px-4 py-20">
                    <div className="max-w-4xl">
                        <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#F39200]">
                            Beasell Angola
                        </p>
                        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
                            Vendas em Angola com método, equipa preparada e execução diária
                        </h1>
                        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-blue-100 md:text-xl">
                            A Beasell apoia empresas, empreendedores e equipas comerciais que precisam vender mais,
                            organizar o processo comercial e transformar atendimento, prospecção e negociação em
                            resultados mensuráveis.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/contacto?service=consultoria"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-[#F39200] px-8 text-base font-bold text-white transition-colors hover:bg-[#d68000]"
                            >
                                Falar com a Beasell
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/servicos"
                                className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#1A2A49]"
                            >
                                Ver serviços
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-[#1A2A49] md:text-4xl">
                            O que trava muitas vendas no mercado angolano
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Falta de rotina comercial, pouca prospecção, abordagem genérica e equipas sem acompanhamento
                            fazem bons produtos perderem oportunidades. O trabalho da Beasell é ligar estratégia,
                            formação e execução.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {pillars.map((pillar) => (
                            <div key={pillar.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A2A49] text-white">
                                    <pillar.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-[#1A2A49]">{pillar.title}</h3>
                                <p className="leading-relaxed text-gray-600">{pillar.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#f8fafc] py-20">
                <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-[#1A2A49] md:text-4xl">
                            Temas que a Beasell trabalha para aumentar vendas
                        </h2>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                            O plano pode começar por uma formação curta, uma consultoria comercial ou um acompanhamento
                            mensal. O importante é adaptar a solução à equipa, ao sector e ao momento do negócio.
                        </p>
                        <div className="space-y-4">
                            {topics.map((topic) => (
                                <div key={topic} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#F39200]" />
                                    <span className="font-medium text-gray-700">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl bg-[#1A2A49] shadow-2xl">
                        <Image
                            src="/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png"
                            alt="Formação de vendedores e equipa comercial"
                            width={900}
                            height={720}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-[#1A2A49] py-16 text-white">
                <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                        <h2 className="mb-3 text-3xl font-bold">Quer vender mais em Angola com um processo claro?</h2>
                        <p className="text-blue-100">
                            A Beasell pode avaliar o seu contexto comercial e indicar o melhor caminho para formação,
                            consultoria ou apoio de prospecção.
                        </p>
                    </div>
                    <Link
                        href="/contacto?service=prospeccao-comercial"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-[#F39200] px-8 text-base font-bold text-white transition-colors hover:bg-[#d68000]"
                    >
                        Pedir diagnóstico
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
