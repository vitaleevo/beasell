import { Metadata } from "next";
import { buildPageMetadata } from "@/shared/lib/seo";

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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
