import React, { Suspense } from "react";
import ContactHero from "@/features/marketing/components/heroes/ContactHero";
import Contact from "@/features/marketing/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto - Beasell | Entre em Contacto Connosco",
    description: "Fale connosco para saber mais sobre nossos cursos de vendas. Contacte a Beasell em Luanda, Angola. Telefone: (+244) 930 010 002",
    keywords: "contacto beasell, telefone beasell luanda, email beasell angola, localização beasell",
};

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#1A2A49] text-white">Carregando...</div>}>
            <ContactHero />
            <Contact />
        </Suspense>
    );
}
