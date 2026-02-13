import AboutHero from "@/features/marketing/components/heroes/AboutHero";
import About from "@/features/marketing/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nós - Beasell | Especialistas em Formação de Vendas",
    description: "Conheça a equipa da Beasell e nossa missão de transformar profissionais de vendas em Angola. Experiência, dedicação e resultados comprovados.",
    keywords: "sobre beasell, equipa vendas angola, formadores vendas luanda, beatriz chavier",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <About />
        </>
    );
}
