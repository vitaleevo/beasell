"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Slider } from '@/shared/components/ui/slider';
import { Button } from '@/shared/components/ui/button';
import { TrendingUp, Users, DollarSign, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ROICalculator = () => {
    const [revenue, setRevenue] = useState(1000000); // Kwanza
    const [reps, setReps] = useState(5);
    const [conversionRate, setConversionRate] = useState(10); // %
    const [expectedImprovement, setExpectedImprovement] = useState(20); // %

    const [results, setResults] = useState({
        currentSales: 0,
        newSales: 0,
        increase: 0,
        annualImpact: 0
    });

    useEffect(() => {
        const currentSales = revenue;
        const improvementFactor = 1 + (expectedImprovement / 100);
        const newSales = revenue * improvementFactor;
        const increase = newSales - currentSales;
        const annualImpact = increase * 12;

        setResults({
            currentSales,
            newSales,
            increase,
            annualImpact
        });
    }, [revenue, expectedImprovement]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (

        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-900 font-semibold text-sm mb-6">
                        <TrendingUp className="w-4 h-4" />
                        Simulador de Resultados
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1A2A49] mb-6 tracking-tight">
                        Calcule o seu <span className="text-[#F39200]">Potencial de Crescimento</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Descubra quanto a sua empresa pode lucrar a mais com uma equipa de vendas de alta performance treinada pela Beasell.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Input Section */}
                    <Card className="lg:col-span-5 border-0 shadow-lg bg-white overflow-hidden ring-1 ring-gray-100">
                        <CardHeader className="bg-gray-50/50 pb-6 border-b border-gray-100">
                            <CardTitle className="text-xl flex items-center gap-3 text-[#1A2A49]">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Target className="h-5 w-5 text-blue-700" />
                                </div>
                                Dados do Negócio
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    Facturação Mensal Média (AOA)
                                </Label>
                                <div className="relative group">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <Input
                                        type="number"
                                        value={revenue}
                                        onChange={(e) => setRevenue(Number(e.target.value))}
                                        className="pl-12 h-14 bg-gray-50 border-gray-200 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    Número de Vendedores
                                </Label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <Input
                                        type="number"
                                        value={reps}
                                        onChange={(e) => setReps(Number(e.target.value))}
                                        className="pl-12 h-14 bg-gray-50 border-gray-200 text-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-end">
                                    <Label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                        Crescimento Esperado
                                    </Label>
                                    <div className="text-2xl font-bold text-[#F39200] bg-orange-50 px-3 py-1 rounded-lg">
                                        {expectedImprovement}%
                                    </div>
                                </div>
                                <Slider
                                    value={[expectedImprovement]}
                                    onValueChange={(val) => setExpectedImprovement(val[0])}
                                    max={100}
                                    step={1}
                                    className="py-2"
                                />
                                <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
                                    <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <p>Nossos clientes reportam aumentos médios de <span className="font-semibold text-blue-700">20% a 35%</span> nos primeiros 3 meses.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="border-0 shadow-2xl bg-[#1A2A49] text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-700 ease-out">
                                    <TrendingUp className="h-full w-full" />
                                </div>

                                <CardContent className="p-8 md:p-10 relative z-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                        <div>
                                            <h3 className="text-blue-200 font-medium text-sm w-fit uppercase tracking-wider mb-2 bg-blue-900/50 px-3 py-1 rounded-full">
                                                Impacto Mensal Estimado
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg text-blue-300">+</span>
                                                <p className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                                    {formatCurrency(results.increase)}
                                                </p>
                                            </div>
                                            <p className="text-blue-300 mt-1">Acrescimo na facturação mensal</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 lg:gap-8 pt-8 border-t border-white/10">
                                        <div className="space-y-1">
                                            <p className="text-sm text-blue-300 font-medium uppercase tracking-wide">Nova Facturação Total</p>
                                            <p className="text-xl md:text-2xl font-bold text-white">{formatCurrency(results.newSales)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-blue-300 font-medium uppercase tracking-wide">Aumento por Vendedor</p>
                                            <p className="text-xl md:text-2xl font-bold text-white">{formatCurrency(reps > 0 ? results.increase / reps : 0)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="border-0 shadow-xl bg-gradient-to-r from-[#F39200] to-[#E67E00] text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-orange-100 font-semibold uppercase tracking-wider text-sm mb-1">
                                            Potencial de Lucro Anual
                                        </h3>
                                        <p className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                                            +{formatCurrency(results.annualImpact)}
                                        </p>
                                    </div>
                                    <Button className="bg-white text-[#F39200] hover:bg-orange-50 font-bold px-8 py-6 h-auto text-base rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 whitespace-nowrap">
                                        Quero estes Resultados
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <p className="text-center text-xs text-gray-500 italic">
                            * Simulação baseada em projecções. Resultados reais podem variar de acordo com a implementação.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
