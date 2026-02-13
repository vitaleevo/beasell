import TrainingHero from "@/features/marketing/components/training/TrainingHero";
import TrainingFeatures from "@/features/marketing/components/training/TrainingFeatures";
import TrainingCourses from "@/features/marketing/components/training/TrainingCourses";
import TrainingTestimonials from "@/features/marketing/components/training/TrainingTestimonials";
import TrainingCTA from "@/features/marketing/components/training/TrainingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Treinamentos Beasell - Cursos de Vendas e Liderança | Angola",
    description: "Descubra nossos cursos especializados em vendas, liderança e atendimento. Formação prática com resultados comprovados em Angola.",
    keywords: "cursos vendas angola, treinamento comercial, formação liderança, beasell training",
};

export default function TrainingPage() {
    return (
        <div className="overflow-x-hidden">
            <TrainingHero />
            <TrainingFeatures />
            <TrainingCourses />
            <TrainingTestimonials />
            <TrainingCTA />
        </div>
    );
}
