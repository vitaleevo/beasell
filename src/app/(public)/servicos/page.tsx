import ServicesHero from "@/features/marketing/components/heroes/ServicesHero";
import Services from "@/features/marketing/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Serviços de Formação em Vendas - Beasell Angola",
    description: "Descubra nossos serviços: Formação Individual, Empresarial, Workshops e Consultoria Comercial. Metodologia adaptada ao mercado angolano.",
    keywords: "serviços formação vendas, curso vendas individual, formação empresarial, workshops vendas, consultoria comercial angola",
};

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <Services />
        </>
    );
}
