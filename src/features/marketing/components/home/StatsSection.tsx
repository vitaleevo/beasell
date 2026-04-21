"use client";

import React, { useEffect, useState } from 'react';
import { Users, Star, Trophy, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const StatCard = ({ stat, index }: { stat: any, index: number }) => {
  const IconComponent = stat.icon;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
    >
      <div className="bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange-500 to-[#d68000] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform duration-500">
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <div className="text-4xl sm:text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          {stat.number}
        </div>
        <div className="text-sm sm:text-base text-blue-100 font-medium uppercase tracking-widest text-center">
          {stat.label}
        </div>
      </div>
      {/* Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Profissionais Formados",
      icon: Users
    },
    {
      number: "95%",
      label: "Taxa de Satisfação",
      icon: Star
    },
    {
      number: "50+",
      label: "Empresas Parceiras",
      icon: Trophy
    },
    {
      number: "40%",
      label: "Aumento Médio Vendas",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-32 bg-brand-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#F3920015_0%,transparent_50%)]"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#F3920010_0%,transparent_50%)]"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Resultados que <span className="text-brand-orange-500">Falam por Si</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto font-medium"
          >
            Impactamos positivamente a economia de Angola através da capacitação comercial de alta performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
