import { mutation } from "./_generated/server";
import { validateAdmin } from "./authorization";
// Course and Blog Seeding

function validateLocalSeed() {
  const deployment = process.env.CONVEX_DEPLOYMENT ?? "";
  const isLocalDeployment = deployment.startsWith("anonymous:") || deployment.startsWith("local:");
  if (!isLocalDeployment) {
    throw new Error("Seed local bloqueada fora de um deployment Convex local/anonimo.");
  }
}

export const seedBlog = mutation({
  args: {},
  handler: async (ctx) => {
    await validateAdmin(ctx);
    validateLocalSeed();

    const posts = [
      {
        title: "5 Técnicas de Vendas que Funcionam no Mercado Angolano",
        slug: "5-tecnicas-vendas-mercado-angolano",
        excerpt:
          "Descubra as estratégias mais eficazes para vender no contexto empresarial angolano.",
        content: `# 5 Técnicas de Vendas que Funcionam no Mercado Angolano\n\nO mercado angolano apresenta características únicas que exigem abordagens específicas...`,
        author: "Beatriz Chavier",
        category: "Técnicas de Vendas",
        tags: ["vendas", "angola", "estratégias"],
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000",
        isPublished: true,
        isFeatured: true,
        publishedAt: Date.now(),
      },
      {
        title: "Como Superar Objeções de Preço em Tempos Difíceis",
        slug: "superar-objecoes-preco-tempos-dificeis",
        excerpt: "Estratégias práticas para lidar com resistências de preço.",
        content: `# Como Superar Objeções de Preço em Tempos Difíceis\n\nEm momentos económicos desafiantes, as objeções de preço tornam-se mais frequentes...`,
        author: "Beatriz Chavier",
        category: "Gestão de Objeções",
        tags: ["objeções", "preço", "negociação"],
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000",
        isPublished: true,
        isFeatured: false,
        publishedAt: Date.now(),
      },
      {
        title: "Vendas Consultivas: O Futuro do Sector Comercial",
        slug: "vendas-consultivas-futuro-sector-comercial",
        excerpt: "Aprenda como a abordagem consultiva pode revolucionar seus resultados.",
        content: `# Vendas Consultivas: O Futuro do Sector Comercial\n\nA venda consultiva representa uma mudança fundamental na forma como abordamos...`,
        author: "Beatriz Chavier",
        category: "Vendas Consultivas",
        tags: ["consultiva", "relacionamento", "futuro"],
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        isPublished: true,
        isFeatured: false,
        publishedAt: Date.now(),
      },
    ];

    const categories = [
      { name: "Técnicas de Vendas", slug: "tecnicas-vendas" },
      { name: "Gestão de Objeções", slug: "gestao-objecoes" },
      { name: "Vendas Consultivas", slug: "vendas-consultivas" },
      { name: "Liderança Comercial", slug: "lideranca-comercial" },
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
    await validateAdmin(ctx);
    validateLocalSeed();

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
      description:
        "O guia definitivo para dominar o ciclo de vendas em Angola, desde a prospecção até o fecho.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
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

export const seedLocalCourseCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    validateLocalSeed();

    const existingCourses = await ctx.db.query("courses").collect();
    for (const course of existingCourses) await ctx.db.delete(course._id);

    const existingModules = await ctx.db.query("modules").collect();
    for (const moduleDoc of existingModules) await ctx.db.delete(moduleDoc._id);

    const existingLessons = await ctx.db.query("lessons").collect();
    for (const lesson of existingLessons) await ctx.db.delete(lesson._id);

    const now = Date.now();
    const courseId = await ctx.db.insert("courses", {
      title: "Mestres das Vendas: Mercado Angolano",
      slug: "mestres-vendas-mercado-angolano",
      description: "Domine o ciclo de vendas completo em Angola.",
      shortDescription: "Domine o ciclo de vendas completo em Angola.",
      fullDescription:
        "Curso prático para vendedores, empreendedores e equipas comerciais que querem melhorar prospeção, abordagem, negociação e fecho no contexto angolano.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
      price: 150000,
      currency: "AOA",
      isPublished: true,
      status: "published",
      level: "Intermediário",
      language: "pt",
      objectives: [
        "Estruturar uma abordagem comercial consultiva.",
        "Tratar objeções de preço e confiança com segurança.",
        "Criar uma rotina de prospeção adaptada ao mercado angolano.",
      ],
      requirements: ["Vontade de vender melhor", "Acesso a internet"],
      isFree: false,
      allowPreview: true,
      certificateEnabled: true,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      stats: {
        activeEnrollments: 0,
        completions: 0,
        enrollments: 0,
        totalRatings: 0,
        totalRevenue: 0,
      },
    });

    const fundamentalsModuleId = await ctx.db.insert("modules", {
      courseId,
      title: "Fundamentos da venda consultiva",
      order: 1,
      status: "published",
      createdAt: now,
      updatedAt: now,
    });

    const prospectingModuleId = await ctx.db.insert("modules", {
      courseId,
      title: "Prospecção e fecho",
      order: 2,
      status: "published",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("lessons", {
      courseId,
      moduleId: fundamentalsModuleId,
      title: "Boas-vindas e objectivos do curso",
      type: "text",
      contentUrl:
        "Nesta aula, alinhe o objectivo principal: vender com mais clareza, confiança e método. Prepare um caderno para acompanhar os exercícios.",
      duration: 8,
      isFree: true,
      isRequired: true,
      order: 1,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("lessons", {
      courseId,
      moduleId: fundamentalsModuleId,
      title: "Diagnóstico do cliente antes da proposta",
      type: "text",
      contentUrl:
        "Liste as dores do cliente, o impacto financeiro do problema e os sinais de urgência antes de apresentar qualquer solução.",
      duration: 18,
      isFree: false,
      isRequired: true,
      order: 2,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("lessons", {
      courseId,
      moduleId: prospectingModuleId,
      title: "Script de prospecção por WhatsApp",
      type: "text",
      contentUrl:
        "Use uma mensagem curta: contexto, motivo do contacto, benefício claro e uma pergunta simples para abrir conversa.",
      duration: 15,
      isFree: false,
      isRequired: true,
      order: 1,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("lessons", {
      courseId,
      moduleId: prospectingModuleId,
      title: "Fecho com próximos passos claros",
      type: "quiz",
      contentUrl:
        "Quiz prático: defina três opções de próximo passo para evitar terminar uma reunião sem compromisso concreto.",
      duration: 12,
      isFree: false,
      isRequired: true,
      order: 2,
      createdAt: now,
      updatedAt: now,
    });

    return { courseId };
  },
});
