import { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/admin/", "/api/", "/dashboard/", "/aluno/", "/sign-in/", "/sign-up/", "/unauthorized/"],
            },
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/", "/api/", "/dashboard/", "/aluno/", "/sign-in/", "/sign-up/", "/unauthorized/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
