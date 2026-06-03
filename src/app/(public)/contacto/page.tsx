import React, { Suspense } from "react";
import ContactHero from "@/features/marketing/components/heroes/ContactHero";
import Contact from "@/features/marketing/components/Contact";
import { Metadata } from "next";
import JsonLd from "@/shared/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, SITE, webPageJsonLd } from "@/shared/lib/seo";

const title = "Contacto Beasell Angola | Formacao e Consultoria de Vendas em Luanda";
const description = `Fale com a Beasell em Luanda para consultoria comercial, treinamento de vendedores e formacao em vendas. Telefone: ${SITE.displayPhone}.`;

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/contacto",
    keywords: [
        "contacto beasell",
        "telefone beasell luanda",
        "email beasell angola",
        "consultoria vendas luanda contacto",
    ],
});

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#1A2A49] text-white">Carregando...</div>}>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/contacto",
                        about: ["contacto Beasell", "consultoria comercial Luanda"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Contacto", path: "/contacto" },
                    ]),
                ]}
            />
            <ContactHero />
            <Contact />
        </Suspense>
    );
}
