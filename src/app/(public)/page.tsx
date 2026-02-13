import Hero from "@/features/marketing/components/Hero";
import FeaturesSection from "@/features/marketing/components/home/FeaturesSection";
import VideoSection from "@/features/marketing/components/home/VideoSection";
import StatsSection from "@/features/marketing/components/home/StatsSection";
import CoursesSection from "@/features/marketing/components/home/CoursesSection";
import TestimonialsSection from "@/features/marketing/components/home/TestimonialsSection";
import AboutSection from "@/features/marketing/components/home/AboutSection";
import CTASection from "@/features/marketing/components/home/CTASection";
import ROICalculator from "@/features/marketing/components/roi/ROICalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Beasell - Formação de Excelência em Vendas | Angola",
    description: "A Beasell oferece formação especializada em vendas para profissionais e empresas em Angola. Transforme sua carreira comercial com metodologia comprovada.",
    keywords: "formação vendas angola, curso vendas luanda, treinamento comercial, consultoria vendas, beasell",
    openGraph: {
        title: "Beasell - Formação de Excelência em Vendas | Angola",
        description: "A Beasell oferece formação especializada em vendas para profissionais e empresas em Angola. Transforme sua carreira comercial com metodologia comprovada.",
        url: "https://beasell.ao",
        type: "website",
        images: [{ url: "/lovable-uploads/aabccf71-2753-49b9-82b4-62156d717089.png" }],
    },
};

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturesSection />
            <VideoSection />
            <StatsSection />
            <CoursesSection />
            <TestimonialsSection />
            <ROICalculator />
            <AboutSection />
            <CTASection />
        </>
    );
}
