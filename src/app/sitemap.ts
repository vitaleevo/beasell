import { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";

const baseUrl = "https://beasell.ao";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const routes = ["", "/sobre", "/contacto", "/servicos", "/conteudos"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    try {
        // Dynamic routes: Blog
        const posts = await fetchQuery(api.blog.listAll);
        const blogRoutes = posts.map((post) => ({
            url: `${baseUrl}/conteudos/${post.slug}`,
            lastModified: new Date(post.publishedAt),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));

        // Dynamic routes: Courses
        const courses = await fetchQuery(api.courses.list, { onlyPublished: true });
        const courseRoutes = courses.map((course) => ({
            url: `${baseUrl}/cursos/${course.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        return [...routes, ...blogRoutes, ...courseRoutes];
    } catch (error) {
        console.error("Error generating dynamic sitemap routes:", error);
        return routes;
    }
}
