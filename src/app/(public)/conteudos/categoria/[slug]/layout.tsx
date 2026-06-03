import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import JsonLd from "@/shared/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/shared/lib/seo";

type CategoryLayoutProps = {
    children: ReactNode;
    params: Promise<{ slug: string }>;
};

function titleFromSlug(slug: string) {
    return decodeURIComponent(slug)
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

async function getCategoryName(slug: string) {
    try {
        const categories = await fetchQuery(api.blog.listCategories);
        return categories.find((category) => category.slug === slug)?.name;
    } catch {
        return undefined;
    }
}

export async function generateMetadata({
    params,
}: Pick<CategoryLayoutProps, "params">): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = (await getCategoryName(slug)) || titleFromSlug(slug);
    const title = `${categoryName} | Conteudos de Vendas em Angola`;
    const description = `Artigos da Beasell sobre ${categoryName.toLowerCase()}, vendas em Angola, gestao comercial e crescimento de negocios no mercado angolano.`;

    return buildPageMetadata({
        title,
        description,
        path: `/conteudos/categoria/${slug}`,
        keywords: [
            `${categoryName} Angola`,
            `${categoryName} vendas`,
            "blog Beasell Angola",
            "estrategias comerciais Angola",
        ],
    });
}

export default async function CategoryLayout({ children, params }: CategoryLayoutProps) {
    const { slug } = await params;
    const categoryName = (await getCategoryName(slug)) || titleFromSlug(slug);
    const title = `${categoryName} | Conteudos de Vendas em Angola`;
    const description = `Conteudos Beasell sobre ${categoryName.toLowerCase()} para profissionais, empreendedores e equipas comerciais em Angola.`;
    const path = `/conteudos/categoria/${slug}`;

    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path,
                        about: [categoryName, "vendas em Angola", "gestao comercial"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Conteudos", path: "/conteudos" },
                        { name: categoryName, path },
                    ]),
                ]}
            />
            {children}
        </>
    );
}
