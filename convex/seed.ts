import { mutation } from "./_generated/server";
// Course and Blog Seeding

export const seedBlog = mutation({
    args: {},
    handler: async (ctx) => {
        const posts = [
            {
                title: '5 Técnicas de Vendas que Funcionam no Mercado Angolano',
                slug: '5-tecnicas-vendas-mercado-angolano',
                excerpt: 'Descubra as estratégias mais eficazes para vender no contexto empresarial angolano.',
                content: `# 5 Técnicas de Vendas que Funcionam no Mercado Angolano\n\nO mercado angolano apresenta características únicas que exigem abordagens específicas...`,
                author: 'Beatriz Chavier',
                category: 'Técnicas de Vendas',
                tags: ['vendas', 'angola', 'estratégias'],
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000',
                isPublished: true,
                isFeatured: true,
                publishedAt: Date.now(),
            },
            {
                title: 'Como Superar Objeções de Preço em Tempos Difíceis',
                slug: 'superar-objecoes-preco-tempos-dificeis',
                excerpt: 'Estratégias práticas para lidar com resistências de preço.',
                content: `# Como Superar Objeções de Preço em Tempos Difíceis\n\nEm momentos económicos desafiantes, as objeções de preço tornam-se mais frequentes...`,
                author: 'Beatriz Chavier',
                category: 'Gestão de Objeções',
                tags: ['objeções', 'preço', 'negociação'],
                image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000',
                isPublished: true,
                isFeatured: false,
                publishedAt: Date.now(),
            },
            {
                title: 'Vendas Consultivas: O Futuro do Sector Comercial',
                slug: 'vendas-consultivas-futuro-sector-comercial',
                excerpt: 'Aprenda como a abordagem consultiva pode revolucionar seus resultados.',
                content: `# Vendas Consultivas: O Futuro do Sector Comercial\n\nA venda consultiva representa uma mudança fundamental na forma como abordamos...`,
                author: 'Beatriz Chavier',
                category: 'Vendas Consultivas',
                tags: ['consultiva', 'relacionamento', 'futuro'],
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
                isPublished: true,
                isFeatured: false,
                publishedAt: Date.now(),
            },
        ];

        const categories = [
            { name: 'Técnicas de Vendas', slug: 'tecnicas-vendas' },
            { name: 'Gestão de Objeções', slug: 'gestao-objecoes' },
            { name: 'Vendas Consultivas', slug: 'vendas-consultivas' },
            { name: 'Liderança Comercial', slug: 'lideranca-comercial' },
        ];

        // Clear existing data (optional, but good for seed)
        const existingPosts = await ctx.db.query("posts").collect();
        for (const post of existingPosts) {
            await ctx.db.delete(post._id);
        }

        const existingCategories = await ctx.db.query("categories").collect();
        for (const cat of existingCategories) {
            await ctx.db.delete(cat._id);
        }

        // Insert new data
        for (const post of posts) {
            await ctx.db.insert("posts", post);
        }

        for (const cat of categories) {
            await ctx.db.insert("categories", cat);
        }
    },
});

export const seedCourses = mutation({
    args: {},
    handler: async (ctx) => {
        // Clear existing
        const existingCourses = await ctx.db.query("courses").collect();
        for (const c of existingCourses) await ctx.db.delete(c._id);
        const existingModules = await ctx.db.query("modules").collect();
        for (const m of existingModules) await ctx.db.delete(m._id);
        const existingLessons = await ctx.db.query("lessons").collect();
        for (const l of existingLessons) await ctx.db.delete(l._id);

        const courseId = await ctx.db.insert("courses", {
            title: "Mestres das Vendas: Mercado Angolano",
            slug: "mestres-vendas-mercado-angolano",
            description: "O guia definitivo para dominar o ciclo de vendas em Angola, desde a prospecção até o fecho.",
            thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
            price: 150000,
            isPublished: true,
        });

        const moduleId1 = await ctx.db.insert("modules", {
            courseId,
            title: "Módulo 1: Fundamentos e Mindset",
            order: 1,
        });

        await ctx.db.insert("lessons", {
            moduleId: moduleId1,
            title: "Introdução ao Mercado Angolano",
            type: "video",
            contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: 600,
            order: 1,
        });

        await ctx.db.insert("lessons", {
            moduleId: moduleId1,
            title: "Mindset do Vendedor de Elite",
            type: "video",
            contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: 1200,
            order: 2,
        });

        const moduleId2 = await ctx.db.insert("modules", {
            courseId,
            title: "Módulo 2: Prospecção de Clientes",
            order: 2,
        });

        await ctx.db.insert("lessons", {
            moduleId: moduleId2,
            title: "Estratégias de Prospecção no WhatsApp",
            type: "video",
            contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: 900,
            order: 1,
        });
    },
});
