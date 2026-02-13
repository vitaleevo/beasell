"use client";

import React, { useState, useMemo } from 'react';
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import EnhancedPostCard from '@/features/blog/components/blog/EnhancedPostCard';
import BlogFilters from '@/features/blog/components/blog/BlogFilters';
import PopularPosts from '@/features/blog/components/blog/PopularPosts';
import CategoriesWidget from '@/features/blog/components/blog/CategoriesWidget';
import SearchBar from '@/features/blog/components/blog/SearchBar';
import { Skeleton } from '@/shared/components/ui/skeleton';
import Image from 'next/image';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

export default function BlogPage() {
    const rawPosts = useQuery(api.blog.list);
    const featuredPosts = useQuery(api.blog.listFeatured);
    const rawCategories = useQuery(api.blog.listCategories);

    // Filters State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");

    // Transform categories for the widget and filters
    const categories = useMemo(() => {
        if (!rawCategories || !rawPosts) return [];
        return rawCategories.map(cat => ({
            id: cat._id,
            name: cat.name,
            slug: cat.slug,
            count: rawPosts.filter(p => p.category === cat.slug).length
        }));
    }, [rawCategories, rawPosts]);

    // Filtered Posts Logic
    const filteredPosts = useMemo(() => {
        if (!rawPosts) return [];

        return rawPosts.filter(post => {
            // Search filter
            const matchesSearch = searchQuery === "" ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

            // Year filter
            const postYear = new Date(post.publishedAt).getFullYear().toString();
            const matchesYear = selectedYear === "all" || postYear === selectedYear;

            return matchesSearch && matchesCategory && matchesYear;
        }).map(p => ({
            ...p,
            id: p._id,
            date: new Date(p.publishedAt).toLocaleDateString('pt-AO'),
            readTime: "5 min", // Mocking since it's not in schema
            published: p.isPublished
        }));
    }, [rawPosts, searchQuery, selectedCategory, selectedYear]);

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedYear("all");
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-20 flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
                        alt="Centro de Conteúdo Beasell"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1A2A49] via-[#1A2A49]/90 to-[#1A2A49]/80"></div>
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F39200] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F39200]"></span>
                        </span>
                        Conhecimento que Transforma
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Blog <span className="text-[#F39200]">Beasell</span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Insights estratégicos e guias práticos para impulsionar suas vendas no mercado angolano.
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 relative pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Featured Post - Only show when no filters are active */}
                        {!searchQuery && selectedCategory === "all" && selectedYear === "all" && (
                            <div className="relative group overflow-hidden rounded-3xl shadow-2xl border-none ring-1 ring-white/10">
                                {featuredPosts === undefined ? (
                                    <Skeleton className="h-[450px] w-full rounded-3xl" />
                                ) : featuredPosts && featuredPosts.length > 0 ? (
                                    <EnhancedPostCard
                                        post={{
                                            ...featuredPosts[0],
                                            id: featuredPosts[0]._id,
                                            date: new Date(featuredPosts[0].publishedAt).toLocaleDateString('pt-AO'),
                                            readTime: "8 min",
                                            published: featuredPosts[0].isPublished
                                        } as any}
                                        variant="large"
                                    />
                                ) : null}
                            </div>
                        )}

                        {/* Search/Filter Results Status */}
                        {(searchQuery || selectedCategory !== "all" || selectedYear !== "all") && (
                            <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-blue-50 gap-4">
                                <div className="text-gray-600">
                                    Encontramos <span className="font-bold text-blue-900">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
                                    {searchQuery && <span> para <span className="italic font-medium text-blue-900 text-lg">"{searchQuery}"</span></span>}
                                    {selectedCategory !== "all" && <span> na categoria <span className="font-medium text-[#F39200]">{categories.find(c => c.slug === selectedCategory)?.name}</span></span>}
                                </div>
                                <Button variant="outline" onClick={handleReset} className="rounded-full text-blue-600 border-blue-100 hover:bg-blue-50 shrink-0">
                                    Limpar Filtros
                                </Button>
                            </div>
                        )}

                        {/* Post Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {rawPosts === undefined ? (
                                Array(4).fill(0).map((_, i) => (
                                    <Skeleton key={i} className="h-[480px] w-full rounded-2xl shadow-sm" />
                                ))
                            ) : filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <EnhancedPostCard
                                        key={post._id}
                                        post={post as any}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6 text-gray-400">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum artigo encontrado</h3>
                                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                        Não encontramos nenhum resultado que corresponda aos filtros selecionados.
                                    </p>
                                    <Button onClick={handleReset} className="rounded-full px-8 bg-[#F39200] hover:bg-[#d68000]">
                                        Ver todos os artigos
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24">
                            <BlogFilters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                selectedYear={selectedYear}
                                onCategoryChange={setSelectedCategory}
                                onYearChange={setSelectedYear}
                                onReset={handleReset}
                            />

                            <div className="mt-8 space-y-8">
                                <CategoriesWidget categories={categories} />
                                {rawPosts && (
                                    <PopularPosts
                                        posts={rawPosts.slice(0, 5).map(p => ({
                                            ...p,
                                            id: p._id,
                                            date: new Date(p.publishedAt).toLocaleDateString('pt-AO'),
                                            readTime: "5 min",
                                            published: p.isPublished
                                        }) as any)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
