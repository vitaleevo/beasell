"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";

export default function ContentManagerPage() {
  const posts = useQuery(api.blog.listAll);

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Blog"
        icon={FileText}
        title="Gestão de Conteúdos"
        description="Publique artigos e novidades para a sua audiência."
        actions={
          <Button className="bg-blue-900 text-white">
            <Plus className="mr-2 h-4 w-4" /> Novo Artigo
          </Button>
        }
      />

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Artigos ({posts?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {posts === undefined ? (
              <p className="py-6 text-center text-sm text-gray-400">A carregar artigos...</p>
            ) : posts.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-400">Nenhum artigo encontrado.</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex min-w-0 gap-3">
                    <RemoteImageFrame
                      src={post.image}
                      decorative
                      className="h-14 w-14 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold break-words text-gray-900">{post.title}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {format(post.publishedAt, "d MMM yyyy", { locale: pt })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.isPublished ? (
                      <Badge className="border-green-200 bg-green-100 text-green-700">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Link href={`/conteudos/${post.slug}`}>
                      <Button variant="outline" size="sm" className="h-9">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-900">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden overflow-x-auto md:block">
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
                    <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                      A carregar artigos...
                    </TableCell>
                  </TableRow>
                ) : posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                      Nenhum artigo encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell>
                        <div className="flex min-w-64 items-center gap-3">
                          <RemoteImageFrame
                            src={post.image}
                            decorative
                            className="h-10 w-10 flex-shrink-0 rounded"
                          />
                          <span className="line-clamp-1 font-medium text-gray-900">
                            {post.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {post.isPublished ? (
                          <Badge className="border-green-200 bg-green-100 text-green-700">
                            Publicado
                          </Badge>
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
          </div>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
