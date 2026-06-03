"use client";

import React from "react";
import { Users, Star, Trophy, TrendingUp, type LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface Stat {
  number: string;
  label: string;
  icon: LucideIcon;
}

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
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
        stiffness: 100,
      }}
      className="group relative"
    >
      <div className="flex flex-col items-center rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 sm:p-10">
        <div className="from-brand-orange-500 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br to-[#d68000] shadow-lg shadow-orange-500/20 transition-transform duration-500 group-hover:rotate-12">
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <div className="mb-3 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
          {stat.number}
        </div>
        <div className="text-center text-sm font-medium tracking-widest text-blue-100 uppercase sm:text-base">
          {stat.label}
        </div>
      </div>
      {/* Glow Effect */}
      <div className="absolute -inset-2 rounded-[3rem] bg-gradient-to-r from-orange-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-10" />
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Profissionais Formados",
      icon: Users,
    },
    {
      number: "95%",
      label: "Taxa de Satisfação",
      icon: Star,
    },
    {
      number: "50+",
      label: "Empresas Parceiras",
      icon: Trophy,
    },
    {
      number: "40%",
      label: "Aumento Médio Vendas",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="bg-brand-blue-900 relative overflow-hidden py-32">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,#F3920015_0%,transparent_50%)]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_80%_70%,#F3920010_0%,transparent_50%)]"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-black tracking-tight text-white md:text-6xl"
          >
            Resultados que <span className="text-brand-orange-500">Falam por Si</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-xl font-medium text-blue-100"
          >
            Impactamos positivamente a economia de Angola através da capacitação comercial de alta
            performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
