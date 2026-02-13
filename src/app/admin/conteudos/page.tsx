"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/shared/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus, Edit, Trash2, Eye, Layout } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default function ContentManagerPage() {
    const posts = useQuery(api.blog.listAll);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Conteúdos</h1>
                    <p className="text-gray-600">Publique artigos e novidades para a sua audiência.</p>
                </div>
                <Button className="bg-blue-900 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Novo Artigo
                </Button>
            </div>

            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Artigos ({posts?.length ?? 0})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Artigo</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts === undefined ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                                        A carregar artigos...
                                    </TableCell>
                                </TableRow>
                            ) : posts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                                        Nenhum artigo encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post) => (
                                    <TableRow key={post._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden">
                                                    <img src={post.image} alt="" className="h-full w-full object-cover" />
                                                </div>
                                                <span className="font-medium text-gray-900 line-clamp-1">{post.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{post.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {post.isPublished ? (
                                                <Badge className="bg-green-100 text-green-700 border-green-200">Publicado</Badge>
                                            ) : (
                                                <Badge variant="secondary">Rascunho</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-500">
                                            {format(post.publishedAt, "d MMM yyyy", { locale: pt })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/conteudos/${post.slug}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-900">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

