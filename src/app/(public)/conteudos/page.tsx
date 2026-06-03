import type { Metadata } from "next";
import BlogIndexClient from "@/features/blog/components/blog/BlogIndexClient";
import JsonLd from "@/shared/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/shared/lib/seo";

const title = "Conteudos sobre Vendas em Angola | Blog Beasell";
const description =
    "Guias, artigos e estrategias sobre tecnicas de vendas, prospeccao, atendimento ao cliente e gestao comercial para o mercado angolano.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/conteudos",
    keywords: [
        "blog vendas angola",
        "dicas comerciais luanda",
        "estrategias de vendas angola",
        "conteudos beasell",
    ],
});

export default function BlogPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/conteudos",
                        about: ["blog de vendas", "estrategias comerciais", "mercado angolano"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Conteudos", path: "/conteudos" },
                    ]),
                ]}
            />
            <BlogIndexClient />
        </>
    );
}
