import ServicesHero from "@/features/marketing/components/heroes/ServicesHero";
import Services from "@/features/marketing/components/Services";
import { Metadata } from "next";
import JsonLd from "@/shared/components/seo/JsonLd";
import {
    breadcrumbJsonLd,
    buildPageMetadata,
    serviceCatalogJsonLd,
    webPageJsonLd,
} from "@/shared/lib/seo";

const title = "Servicos de Vendas em Angola | Consultoria e Formacao Beasell";
const description =
    "Consultoria em gestao, treinamento de vendedores, prospeccao comercial e formacoes para pequenos negocios com metodologia adaptada ao mercado angolano.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/servicos",
    keywords: [
        "servicos de vendas angola",
        "consultoria gestao negocios angola",
        "treinamento para vendedores luanda",
        "prospeccao comercial angola",
    ],
});

export default function ServicesPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/servicos",
                        about: ["consultoria de vendas", "gestao comercial", "treinamento de vendedores"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Servicos", path: "/servicos" },
                    ]),
                    serviceCatalogJsonLd(),
                ]}
            />
            <ServicesHero />
            <Services />
        </>
    );
}
