"use client";

import React, { useMemo } from 'react';
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import EnhancedPostCard from '@/features/blog/components/blog/EnhancedPostCard';
import CategoriesWidget from '@/features/blog/components/blog/CategoriesWidget';
import PopularPosts from '@/features/blog/components/blog/PopularPosts';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { toSlug } from '@/shared/lib/slug';

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const rawPosts = useQuery(api.blog.list);
    const rawCategories = useQuery(api.blog.listCategories);

    const currentCategory = useMemo(() => {
        return rawCategories?.find((category) => category.slug === slug);
    }, [rawCategories, slug]);

    const categories = useMemo(() => {
        if (!rawCategories || !rawPosts) return [];
        return rawCategories.map((cat) => ({
            id: cat._id,
            name: cat.name,
            slug: cat.slug,
            count: rawPosts.filter((post) => toSlug(post.category) === cat.slug).length
        }));
    }, [rawCategories, rawPosts]);

    const filteredPosts = useMemo(() => {
        if (!rawPosts) return [];
        return rawPosts
            .filter((post) => toSlug(post.category) === slug)
            .map((post) => ({
                ...post,
                readTime: "5 min",
            }));
    }, [rawPosts, slug]);

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <section className="relative pt-32 pb-20 overflow-hidden bg-[#1A2A49]">
                <div className="container relative z-10 mx-auto px-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-white hover:text-[#F39200] hover:bg-white/5 mb-8 -ml-4"
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Voltar
                    </Button>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Categoria: <span className="text-[#F39200]">{currentCategory?.name || slug}</span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl leading-relaxed font-light">
                        Explorando todos os conteúdos sobre {currentCategory?.name.toLowerCase() || slug}.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {rawPosts === undefined ? (
                                Array(4).fill(0).map((_, i) => (
                                    <Skeleton key={i} className="h-[480px] w-full rounded-2xl shadow-sm" />
                                ))
                            ) : filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <EnhancedPostCard
                                        key={post._id}
                                        post={post}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center bg-white rounded-3xl shadow-sm">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum artigo nesta categoria</h3>
                                    <Button onClick={() => router.push('/conteudos')} className="rounded-full px-8 bg-[#F39200] hover:bg-[#d68000]">
                                        Ver todos os artigos
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <CategoriesWidget categories={categories} />
                            {rawPosts && (
                                <PopularPosts
                                    posts={rawPosts.slice(0, 5).map((p) => ({
                                        ...p,
                                        readTime: "5 min",
                                    }))}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
