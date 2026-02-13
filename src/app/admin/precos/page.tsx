"use client";

import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Plus, Edit, Trash2, DollarSign, Star, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Id } from "@convex/_generated/dataModel";

export default function PriceManagerPage() {
    const services = useQuery(api.services.list);
    const createService = useMutation(api.services.create);
    const updateService = useMutation(api.services.update);
    const removeService = useMutation(api.services.remove);

    const [editingService, setEditingService] = useState<any | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleUpdateService = async (values: any) => {
        try {
            if (editingService) {
                await updateService({ id: editingService._id, ...values });
                toast.success('Serviço actualizado');
            } else {
                await createService(values);
                toast.success('Serviço criado');
            }
            setIsDialogOpen(false);
            setEditingService(null);
        } catch (e) {
            toast.error('Erro ao guardar serviço');
        }
    };

    const handleDelete = async (id: Id<"services">) => {
        if (!window.confirm('Tem a certeza que deseja remover este serviço?')) return;
        try {
            await removeService({ id });
            toast.success('Serviço removido');
        } catch (e) {
            toast.error('Erro ao remover serviço');
        }
    };

    const categories = [
        { key: 'individual', label: 'Formação Individual' },
        { key: 'empresarial', label: 'Formação Empresarial' },
        { key: 'workshop', label: 'Workshops' },
        { key: 'consultoria', label: 'Consultoria' },
    ];

    if (services === undefined) return <div className="p-8">A carregar serviços...</div>;

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestão de Preços 🏷️</h1>
                    <p className="text-gray-600">Gira os pacotes de serviços e preços da Beasell.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-blue-900 hover:bg-blue-800 text-white shadow-lg"
                            onClick={() => setEditingService(null)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Serviço
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-blue-900">
                                {editingService ? 'Editar Serviço' : 'Criar Novo Serviço'}
                            </DialogTitle>
                        </DialogHeader>
                        <ServiceEditor
                            service={editingService}
                            onSave={handleUpdateService}
                            onCancel={() => {
                                setIsDialogOpen(false);
                                setEditingService(null);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Card key={category.key} className="border-0 shadow-sm border-l-4 border-blue-900">
                        <CardContent className="p-6">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{category.label}</p>
                            <p className="text-3xl font-black text-gray-900">
                                {services.filter(s => s.category === category.key).length}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-12">
                {categories.map((category) => {
                    const categoryServices = services.filter(s => s.category === category.key);
                    if (categoryServices.length === 0) return null;

                    return (
                        <div key={category.key} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-bold text-gray-900">{category.label}</h2>
                                <div className="h-[1px] flex-1 bg-gray-200" />
                            </div>

                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {categoryServices.map((service) => (
                                    <Card key={service._id} className="group hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden relative">
                                        {service.popular && (
                                            <div className="absolute top-0 right-0 bg-blue-900 text-white px-4 py-1 flex items-center gap-1 rounded-bl-xl z-10">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">Popular</span>
                                            </div>
                                        )}

                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl text-blue-900 font-bold leading-tight group-hover:text-blue-700">
                                                    {service.name}
                                                </CardTitle>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">{service.description}</p>
                                        </CardHeader>

                                        <CardContent className="space-y-6 pt-0">
                                            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Investimento</span>
                                                    <div className="text-right">
                                                        <span className="text-2xl font-black text-gray-900">
                                                            {service.price.toLocaleString('pt-AO')}
                                                        </span>
                                                        <span className="text-sm font-bold text-blue-900 ml-1">{service.currency}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium pt-2 border-t border-gray-200/50">
                                                    <DollarSign className="h-3 w-3" />
                                                    Duração: {service.duration}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Incluído:</p>
                                                <ul className="space-y-2">
                                                    {service.features.map((feature: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-3 group/li">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0 group-hover/li:scale-150 transition-transform" />
                                                            <span className="text-sm text-gray-600 font-medium leading-tight">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="pt-4 border-t flex gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="flex-1 bg-gray-50 text-gray-600 hover:bg-blue-900 hover:text-white transition-all shadow-none"
                                                    onClick={() => {
                                                        setEditingService(service);
                                                        setIsDialogOpen(true);
                                                    }}
                                                >
                                                    <Edit className="h-3 w-3 mr-2" /> Editar
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-9 w-9 p-0 text-red-400 hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => handleDelete(service._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ServiceEditor({ service, onSave, onCancel }: any) {
    const [formData, setFormData] = useState({
        name: service?.name || '',
        description: service?.description || '',
        price: service?.price || 0,
        currency: service?.currency || 'AOA',
        duration: service?.duration || '',
        features: service?.features?.join('\n') || '',
        popular: service?.popular || false,
        category: service?.category || 'individual',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceData = {
            ...formData,
            features: formData.features.split('\n').map((f: string) => f.trim()).filter(Boolean),
        };
        onSave(serviceData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2 italic">
                        <Info className="h-3 w-3" /> Nome do Serviço
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
                        placeholder="Ex: Formação VIP em Luanda"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block italic">Descrição Curta</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium resize-none"
                        rows={2}
                        placeholder="Resumo que aparecerá no card..."
                        required
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block italic">Investimento</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full h-12 px-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block italic">Moeda</label>
                        <select
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            className="w-full h-12 px-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
                        >
                            <option value="AOA">AOA</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block italic">Duração</label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full h-12 px-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
                            placeholder="Ex: 8 horas"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block italic">Categoria</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full h-12 px-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
                        required
                    >
                        <option value="individual">Formação Individual</option>
                        <option value="empresarial">Formação Empresarial</option>
                        <option value="workshop">Workshops</option>
                        <option value="consultoria">Consultoria</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block italic">Características (uma por linha)</label>
                    <textarea
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        className="w-full p-4 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium"
                        rows={4}
                        placeholder="Acompanhamento personalizado&#10;Material didático&#10;Certificado Beasell"
                        required
                    />
                </div>

                <div className="flex items-center p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <label className="flex items-center cursor-pointer gap-3 text-sm font-bold text-blue-900">
                        <input
                            type="checkbox"
                            checked={formData.popular}
                            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                            className="h-5 w-5 rounded border-blue-900 text-blue-900 focus:ring-blue-900"
                        />
                        Destaque como "Mais Procurado"
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="ghost" onClick={onCancel} className="text-gray-500">
                    Cancelar
                </Button>
                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white min-w-[150px] shadow-lg">
                    {service ? 'Guardar Alterações' : 'Criar Serviço'}
                </Button>
            </div>
        </form>
    );
}

