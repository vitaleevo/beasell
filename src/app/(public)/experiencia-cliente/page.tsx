import CustomerExperienceHero from "@/features/marketing/components/heroes/CustomerExperienceHero";
import Testimonials from "@/features/marketing/components/Testimonials";
import CTASection from "@/features/marketing/components/home/CTASection";
import { Metadata } from "next";
import JsonLd from "@/shared/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/shared/lib/seo";

const title = "Experiencia do Cliente Beasell | Resultados em Vendas Angola";
const description =
    "Veja experiencias, depoimentos e resultados de clientes que melhoraram atendimento, gestao comercial e vendas com a Beasell em Angola.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/experiencia-cliente",
    keywords: [
        "experiencia cliente beasell",
        "depoimentos clientes angola",
        "resultados formacao vendas",
        "avaliacoes consultoria vendas angola",
    ],
});

export default function CustomerExperiencePage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/experiencia-cliente",
                        about: ["experiencia do cliente", "resultados comerciais", "vendas Angola"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Experiencia do Cliente", path: "/experiencia-cliente" },
                    ]),
                ]}
            />
            <CustomerExperienceHero />
            <Testimonials />
            <CTASection />
        </>
    );
}
