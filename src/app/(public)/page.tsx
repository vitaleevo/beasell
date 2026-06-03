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
import JsonLd from "@/shared/components/seo/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/shared/lib/seo";

const title = "Beasell Angola | Formacao de Vendas, Consultoria e Gestao Comercial";
const description =
    "Formacao em vendas, consultoria comercial, prospeccao e atendimento ao cliente para empresas, empreendedores e equipas comerciais em Angola.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/",
    keywords: [
        "beasell formacao de vendas",
        "consultoria comercial angola",
        "curso de vendas luanda",
        "treinamento de vendedores angola",
    ],
});

export default function HomePage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/",
                        about: ["vendas em Angola", "formacao comercial", "consultoria de gestao"],
                    }),
                    breadcrumbJsonLd([{ name: "Inicio", path: "/" }]),
                ]}
            />
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
