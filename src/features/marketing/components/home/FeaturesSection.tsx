"use client";

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Target, Users, Rocket } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Foco em Resultados",
      description: "Nossa metodologia é orientada a KPIs reais, focando no aumento imediato da sua conversão.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Mentoria Próxima",
      description: "Acompanhamento personalizado com especialistas que vivem o dia a dia do mercado angolano.",
      color: "orange"
    },
    {
      icon: Rocket,
      title: "Crescimento Exponencial",
      description: "Ferramentas e estratégias para escalar seu negócio de forma sustentável e rápida.",
      color: "blue"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Excelência em Vendas
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-brand-blue-900 mb-6"
          >
            Por que escolher a <span className="text-brand-orange-500">Beasell</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Combinamos conhecimento global com execução local para criar o programa de formação comercial mais eficaz de Angola.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
                  feature.color === 'orange' 
                    ? 'bg-brand-orange-500/10 text-brand-orange-500 group-hover:bg-brand-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-200' 
                    : 'bg-brand-blue-900/5 text-brand-blue-900 group-hover:bg-brand-blue-900 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200'
                }`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-blue-900 mb-4 group-hover:text-brand-orange-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-brand-blue-900 hover:bg-[#253b66] text-white px-10 py-7 h-auto text-lg font-bold rounded-2xl shadow-xl shadow-blue-900/20 transition-all hover:scale-105 active:scale-95">
            <Link href="/servicos">
              Conheça nossa metodologia
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
