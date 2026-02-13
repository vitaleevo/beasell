"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    BookOpen
} from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";

export default function AdminCoursesPage() {
    const courses = useQuery(api.courses.list, {});

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Cursos</h1>
                    <p className="text-gray-600">Crie, edite e organize o conteúdo dos seus cursos.</p>
                </div>
                <Link href="/admin/cursos/novo">
                    <Button className="bg-blue-900 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Novo Curso
                    </Button>
                </Link>
            </div>

            <Card className="border-0 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Curso</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Alunos</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses === undefined ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                                    A carregar cursos...
                                </TableCell>
                            </TableRow>
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                                    Nenhum curso encontrado. Comece por criar um novo!
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-16 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    src={course.thumbnailUrl}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-gray-900">{course.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('pt-AO', {
                                            style: 'currency',
                                            currency: 'AOA'
                                        }).format(course.price)}
                                    </TableCell>
                                    <TableCell>
                                        {course.isPublished ? (
                                            <Badge className="bg-green-100 text-green-700 border-green-200">Publicado</Badge>
                                        ) : (
                                            <Badge variant="secondary">Rascunho</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/cursos/${course._id}`} className="flex items-center">
                                                        <Edit className="mr-2 h-4 w-4" /> Editar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/plataforma/cursos/${course.slug}`} className="flex items-center">
                                                        <Eye className="mr-2 h-4 w-4" /> Ver Preview
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 flex items-center">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`bg-white rounded-xl border ${className}`}>{children}</div>;
}

