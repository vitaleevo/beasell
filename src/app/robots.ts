import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/dashboard/", "/aluno/"],
        },
        sitemap: "https://beasell.ao/sitemap.xml",
    };
}
