import type { Metadata } from "next";

const fallbackSiteUrl = "https://beasell.ao";

const normalizeSiteUrl = (url: string) => url.replace(/\/+$/, "");

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
);

export const SITE = {
  name: "Beasell",
  fullName: "Beasell Angola",
  legalName: "BEASELL, LDA",
  url: SITE_URL,
  locale: "pt_AO",
  language: "pt-AO",
  nif: "5002528509",
  phone: "+244930010002",
  displayPhone: "(+244) 930 010 002",
  email: "info@beasell.ao",
  address: {
    streetAddress: "Rua Marechal Bros Tito No 35, Edificio Skyone 4o andar",
    addressLocality: "Luanda",
    addressRegion: "Luanda",
    addressCountry: "AO",
  },
  logo: "/lovable-uploads/06b8610c-4417-45a9-a695-12f10b09eeab.png",
  ogImage: "/lovable-uploads/aabccf71-2753-49b9-82b4-62156d717089.png",
} as const;

export const strategicKeywords = [
  "beasell",
  "beasel",
  "beasell angola",
  "beasel angola",
  "vendas angola",
  "vendas em angola",
  "formacao vendas angola",
  "formacao em vendas luanda",
  "treinamento comercial angola",
  "curso de vendas luanda",
  "consultoria vendas angola",
  "consultoria comercial luanda",
  "gestao comercial angola",
  "prospeccao comercial angola",
  "atendimento ao cliente angola",
  "lideranca comercial angola",
];

export const serviceAreas = [
  "Luanda",
  "Angola",
  "Mercado angolano",
  "Empresas em crescimento",
  "Pequenos negocios",
  "Equipas comerciais",
];

export const beasellServices = [
  {
    name: "Consultoria em Gestao de Negocios",
    description:
      "Diagnostico empresarial, plano de accao, acompanhamento de gestao e indicadores para empresas em Angola.",
    serviceType: "consultoria-gestao",
    path: "/servicos#servicos",
  },
  {
    name: "Treinamento para Vendedores",
    description:
      "Formacao pratica em atendimento, tecnicas de vendas, contorno de objecoes, fecho e funil comercial.",
    serviceType: "treinamento-vendedores",
    path: "/servicos#servicos",
  },
  {
    name: "Prospeccao e Apoio Comercial",
    description:
      "Pesquisa de potenciais clientes, scripts comerciais, gestao de leads e apoio a propostas comerciais.",
    serviceType: "prospeccao-comercial",
    path: "/servicos#servicos",
  },
  {
    name: "Formacoes para Pequenos Negocios",
    description:
      "Formacoes de curta duracao sobre planeamento, precificacao, lideranca e crescimento comercial.",
    serviceType: "formacoes-pequenos-negocios",
    path: "/servicos#cursos",
  },
];

export const beasellCourses = [
  {
    name: "Tecnicas Avancadas de Vendas",
    description:
      "Curso para dominar abordagem, persuasao, negociacao, gestao de objecoes e fecho de vendas.",
    path: "/treinamento",
  },
  {
    name: "Lideranca Comercial",
    description:
      "Formacao para gerir equipas comerciais, metas, motivacao, coaching e performance de vendas.",
    path: "/treinamento",
  },
  {
    name: "Atendimento ao Cliente Excellence",
    description:
      "Curso para melhorar comunicacao, resolucao de conflitos, fidelizacao e experiencia do cliente.",
    path: "/treinamento",
  },
];

export const indexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} satisfies Metadata["robots"];

export const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} satisfies Metadata["robots"];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function normalizePath(path = "/") {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = SITE.ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  robots = indexableRobots,
}: PageMetadataOptions): Metadata {
  const canonicalPath = normalizePath(path);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(image);
  const mergedKeywords = [...new Set([...strategicKeywords, ...keywords])];

  const sharedOpenGraph = {
    title,
    description,
    url: canonicalUrl,
    siteName: SITE.fullName,
    locale: SITE.locale,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "pt-AO": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph:
      type === "article"
        ? {
            ...sharedOpenGraph,
            type: "article",
            publishedTime,
            modifiedTime,
            authors,
          }
        : {
            ...sharedOpenGraph,
            type: "website",
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.fullName,
    legalName: SITE.legalName,
    alternateName: ["Beasell", "Beasell Angola", "Beasel"],
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    telephone: SITE.phone,
    email: SITE.email,
    taxID: SITE.nif,
    priceRange: "Sob consulta",
    address: {
      "@type": "PostalAddress",
      ...SITE.address,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    knowsAbout: strategicKeywords,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.fullName,
    alternateName: ["Beasell", "Beasel"],
    url: SITE.url,
    inLanguage: SITE.language,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/conteudos?pesquisa={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path = "/",
  about = [],
}: {
  title: string;
  description: string;
  path?: string;
  about?: string[];
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: SITE.language,
    isPartOf: {
      "@id": `${SITE.url}/#website`,
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    about: about.map((name) => ({
      "@type": "Thing",
      name,
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>,
) {
  const lastItem = items[items.length - 1];
  const id = lastItem ? `${absoluteUrl(lastItem.path)}#breadcrumb` : `${SITE.url}/#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceCatalogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${SITE.url}/servicos#offer-catalog`,
    name: "Servicos Beasell para vendas e gestao comercial em Angola",
    url: absoluteUrl("/servicos"),
    itemListElement: beasellServices.map((service) => ({
      "@type": "Offer",
      url: absoluteUrl(service.path),
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: service.serviceType,
        provider: {
          "@id": `${SITE.url}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Angola",
        },
      },
    })),
  };
}

export function courseListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/treinamento#course-list`,
    name: "Cursos de vendas e lideranca comercial da Beasell",
    itemListElement: beasellCourses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        url: absoluteUrl(course.path),
        provider: {
          "@id": `${SITE.url}/#organization`,
        },
      },
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  author,
  section,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  section?: string;
  keywords?: string[];
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: image ? [absoluteUrl(image)] : [absoluteUrl(SITE.ogImage)],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
    },
    articleSection: section,
    keywords: [...new Set([...strategicKeywords, ...keywords])].join(", "),
    inLanguage: SITE.language,
  };
}
