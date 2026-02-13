import React from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
    ArrowLeft,
    Calendar,
    User,
    Clock,
    Layout,
} from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import ShareButtons from "@/features/blog/components/blog/ShareButtons";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchQuery(api.blog.getBySlug, { slug });

    if (!post) return { title: "Artigo não encontrado" };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default async function BlogPostDetail({ params }: PageProps) {
    const { slug } = await params;
    const post = await fetchQuery(api.blog.getBySlug, { slug });

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
                <p className="text-gray-600 mb-8">O artigo que procura não existe ou foi removido.</p>
                <Link href="/conteudos">
                    <Button className="bg-[#1A2A49] hover:bg-[#2a3a59] rounded-full px-8">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar ao Blog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            {/* Premium Post Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#1A2A49]"></div>
                    {post.image && (
                        <>
                            <img
                                src={post.image}
                                alt=""
                                className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1A2A49]/80 via-[#1A2A49] to-[#1A2A49]"></div>
                        </>
                    )}
                </div>

                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/conteudos" className="inline-flex items-center text-blue-200 hover:text-[#F39200] mb-8 group transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Voltar aos Conteúdos
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Badge className="bg-[#F39200] text-white border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                {post.category}
                            </Badge>
                            <span className="text-blue-300 text-sm flex items-center">
                                <Clock className="h-4 w-4 mr-1.5" />
                                5 min de leitura
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 py-6 border-t border-white/10">
                            <div className="w-12 h-12 rounded-full bg-[#F39200] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="text-white font-bold text-lg">{post.author}</div>
                                <div className="text-blue-300 text-sm flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                    {new Date(post.publishedAt).toLocaleDateString("pt-AO")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Body */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Article Content */}
                        <div className="lg:col-span-8 space-y-12">
                            {post.image && (
                                <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border-none">
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-2xl text-gray-600 mb-10 leading-relaxed font-light italic border-l-4 border-[#F39200] pl-6">
                                        {post.excerpt}
                                    </p>

                                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg font-normal">
                                        {post.content}
                                    </div>
                                </div>

                                {/* Tags and Sharing */}
                                <div className="mt-16 pt-12 border-t border-gray-100">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        {post.tags && post.tags.length > 0 && (
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Tags do Artigo</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags.map((tag, index) => (
                                                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none px-4 py-1 rounded-full transition-colors cursor-pointer">
                                                            #{tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="md:text-right">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Compartilhar</h3>
                                            <ShareButtons url={`https://beasell.ao/conteudos/${post.slug}`} title={post.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-[#1A2A49] rounded-3xl p-8 text-white shadow-2xl">
                                    <div className="w-20 h-20 rounded-2xl bg-[#F39200] flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                                        {post.author.charAt(0)}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{post.author}</h3>
                                    <p className="text-blue-200/80 mb-6 font-light leading-relaxed">
                                        Especialista em vendas com vasta experiência no mercado angolano, focado em transformar resultados comerciais.
                                    </p>
                                    <Button variant="outline" className="w-full rounded-xl border-white/20 hover:bg-white/10 text-white h-12" asChild>
                                        <Link href="/sobre">Conhecer Autor</Link>
                                    </Button>
                                </div>

                                <div className="bg-[#F39200] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Layout size={80} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 relative z-10">Precisa de ajuda com suas vendas?</h3>
                                    <p className="text-white/90 mb-6 font-light relative z-10">
                                        Conheça nossa metodologia e transforme sua equipe comercial.
                                    </p>
                                    <Button className="w-full bg-white text-[#F39200] hover:bg-blue-50 rounded-xl h-12 font-bold shadow-lg" asChild>
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
