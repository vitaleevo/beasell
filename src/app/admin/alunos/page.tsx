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
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Mail, Calendar, Shield } from "lucide-react";

export default function StudentManagerPage() {
    const users = useQuery(api.users.list);
    const students = users?.filter(u => u.role === "student") || [];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gestão de Alunos</h1>
                <p className="text-gray-600">Visualize e gira os utilizadores registados na plataforma.</p>
            </div>

            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Todos os Alunos ({students.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Utilizador</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Acesso</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users === undefined ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                                        A carregar utilizadores...
                                    </TableCell>
                                </TableRow>
                            ) : students.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                                        Nenhum aluno registado ainda.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                students.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-blue-100 text-blue-900 font-bold">
                                                        {user.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-gray-900">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-gray-500">
                                                <Mail className="h-3 w-3 mr-2" />
                                                {user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="flex w-fit items-center gap-1">
                                                <Shield className="h-3 w-3" />
                                                Aluno
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-xs text-gray-400">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                Ativo
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button className="text-blue-900 hover:underline text-sm font-medium">
                                                Detalhes
                                            </button>
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

