import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Layout } from "lucide-react";
import ShareButtons from "@/features/blog/components/blog/ShareButtons";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/shared/components/seo/JsonLd";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  noIndexRobots,
  webPageJsonLd,
} from "@/shared/lib/seo";
import { toSlug } from "@/shared/lib/slug";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchQuery(api.blog.getBySlug, { slug });

  if (!post || !post.isPublished) {
    return {
      title: "Artigo nao encontrado | Beasell Angola",
      robots: noIndexRobots,
    };
  }

  const publishedTime = new Date(post.publishedAt).toISOString();

  return buildPageMetadata({
    title: `${post.title} | Blog Beasell`,
    description: post.excerpt,
    path: `/conteudos/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime,
    modifiedTime: publishedTime,
    authors: [post.author],
    keywords: [post.category, ...post.tags],
  });
}

export default async function BlogPostDetail({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchQuery(api.blog.getBySlug, { slug });

  if (!post || !post.isPublished) {
    notFound();
  }

  const articlePath = `/conteudos/${post.slug}`;
  const categorySlug = toSlug(post.category);
  const publishedTime = new Date(post.publishedAt).toISOString();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <JsonLd
        data={[
          webPageJsonLd({
            title: post.title,
            description: post.excerpt,
            path: articlePath,
            about: [post.category, ...post.tags],
          }),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Conteudos", path: "/conteudos" },
            { name: post.category, path: `/conteudos/categoria/${categorySlug}` },
            { name: post.title, path: articlePath },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: articlePath,
            image: post.image,
            publishedTime,
            modifiedTime: publishedTime,
            author: post.author,
            section: post.category,
            keywords: post.tags,
          }),
        ]}
      />
      {/* Premium Post Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1A2A49]"></div>
          {post.image && (
            <>
              <RemoteImageFrame
                src={post.image}
                decorative
                className="h-full w-full scale-110 opacity-20 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A2A49]/80 via-[#1A2A49] to-[#1A2A49]"></div>
            </>
          )}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/conteudos"
              className="group mb-8 inline-flex items-center text-blue-200 transition-colors hover:text-[#F39200]"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Voltar aos Conteúdos
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border-none bg-[#F39200] px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                {post.category}
              </Badge>
              <span className="flex items-center text-sm text-blue-300">
                <Clock className="mr-1.5 h-4 w-4" />5 min de leitura
              </span>
            </div>

            <h1 className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight text-white md:text-6xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 border-t border-white/10 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F39200] text-xl font-bold text-white shadow-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-bold text-white">{post.author}</div>
                <div className="flex items-center text-sm text-blue-300">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("pt-AO")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Article Content */}
            <div className="space-y-12 lg:col-span-8">
              {post.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                  <RemoteImageFrame src={post.image} alt={post.title} className="h-full w-full" />
                </div>
              )}

              <div className="rounded-[2rem] border-none bg-white p-8 shadow-xl md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="mb-10 border-l-4 border-[#F39200] pl-6 text-2xl leading-relaxed font-light text-gray-600 italic">
                    {post.excerpt}
                  </p>

                  <div className="text-lg leading-relaxed font-normal whitespace-pre-wrap text-gray-800">
                    {post.content}
                  </div>
                </div>

                {/* Tags and Sharing */}
                <div className="mt-16 border-t border-gray-100 pt-12">
                  <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    {post.tags && post.tags.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                          Tags do Artigo
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer rounded-full border-none bg-gray-100 px-4 py-1 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="md:text-right">
                      <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Compartilhar
                      </h3>
                      <ShareButtons
                        url={`https://beasell.ao/conteudos/${post.slug}`}
                        title={post.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8 lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div className="rounded-3xl bg-[#1A2A49] p-8 text-white shadow-2xl">
                  <div className="mb-6 flex h-20 w-20 rotate-3 items-center justify-center rounded-2xl bg-[#F39200] text-3xl font-bold text-white shadow-lg transition-transform group-hover:rotate-0">
                    {post.author.charAt(0)}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{post.author}</h3>
                  <p className="mb-6 leading-relaxed font-light text-blue-200/80">
                    Especialista em vendas com vasta experiência no mercado angolano, focado em
                    transformar resultados comerciais.
                  </p>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl border-white/20 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/sobre">Conhecer Autor</Link>
                  </Button>
                </div>

                <div className="group relative overflow-hidden rounded-3xl bg-[#F39200] p-8 text-white shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110">
                    <Layout size={80} />
                  </div>
                  <h3 className="relative z-10 mb-4 text-xl font-bold">
                    Precisa de ajuda com suas vendas?
                  </h3>
                  <p className="relative z-10 mb-6 font-light text-white/90">
                    Conheça nossa metodologia e transforme sua equipe comercial.
                  </p>
                  <Button
                    className="h-12 w-full rounded-xl bg-white font-bold text-[#F39200] shadow-lg hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/contacto">Falar com Especialista</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
