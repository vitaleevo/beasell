import AboutHero from "@/features/marketing/components/heroes/AboutHero";
import About from "@/features/marketing/components/About";
import { Metadata } from "next";
import JsonLd from "@/shared/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/shared/lib/seo";

const title = "Sobre a Beasell | Especialistas em Vendas e Gestao em Angola";
const description =
    "Conheca a Beasell, empresa angolana de consultoria, formacao comercial e apoio a empreendedores, equipas de vendas e negocios em crescimento.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/sobre",
    keywords: [
        "sobre beasell",
        "beasell lda",
        "equipa vendas angola",
        "formadores vendas luanda",
    ],
});

export default function AboutPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/sobre",
                        about: ["Beasell", "consultoria em Angola", "formacao em vendas"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Sobre", path: "/sobre" },
                    ]),
                ]}
            />
            <AboutHero />
            <About />
        </>
    );
}
