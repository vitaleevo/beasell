import CustomerExperienceHero from "@/features/marketing/components/heroes/CustomerExperienceHero";
import Testimonials from "@/features/marketing/components/Testimonials";
import CTASection from "@/features/marketing/components/home/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experiência do Cliente - Beasell | O que Nossos Clientes Dizem",
    description: "Leia as experiências de profissionais e empresas que transformaram seus resultados com a formação da Beasell em Angola. Depoimentos e casos de sucesso.",
    keywords: "experiência cliente beasell, avaliações curso vendas, depoimentos clientes angola, resultados formação vendas",
};

export default function CustomerExperiencePage() {
    return (
        <>
            <CustomerExperienceHero />
            <Testimonials />
            <CTASection />
        </>
    );
}
