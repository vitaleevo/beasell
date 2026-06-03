import { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import { SITE_URL } from "@/shared/lib/seo";

export const revalidate = 3600;

const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
}> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/vendas-angola", changeFrequency: "weekly", priority: 0.95 },
    { path: "/servicos", changeFrequency: "weekly", priority: 0.9 },
    { path: "/treinamento", changeFrequency: "weekly", priority: 0.88 },
    { path: "/conteudos", changeFrequency: "daily", priority: 0.86 },
    { path: "/sobre", changeFrequency: "monthly", priority: 0.7 },
    { path: "/experiencia-cliente", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
];

function routeUrl(path: string) {
    return `${SITE_URL}${path === "/" ? "" : path}`;
}

function isDynamicServerUsageError(error: unknown) {
    return (
        typeof error === "object" &&
        error !== null &&
        "digest" in error &&
        error.digest === "DYNAMIC_SERVER_USAGE"
    );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: routeUrl(route.path),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    try {
        const [posts, categories] = await Promise.all([
            fetchQuery(api.blog.list),
            fetchQuery(api.blog.listCategories),
        ]);

        const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
            url: routeUrl(`/conteudos/${post.slug}`),
            lastModified: new Date(post.publishedAt),
            changeFrequency: "monthly",
            priority: 0.72,
        }));

        const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
            url: routeUrl(`/conteudos/categoria/${category.slug}`),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.64,
        }));

        return [...routes, ...blogRoutes, ...categoryRoutes];
    } catch (error) {
        if (!isDynamicServerUsageError(error)) {
            console.error("Error generating dynamic sitemap routes:", error);
        }
        return routes;
    }
}
