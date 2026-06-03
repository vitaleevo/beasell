import TrainingHero from "@/features/marketing/components/training/TrainingHero";
import TrainingFeatures from "@/features/marketing/components/training/TrainingFeatures";
import TrainingCourses from "@/features/marketing/components/training/TrainingCourses";
import TrainingTestimonials from "@/features/marketing/components/training/TrainingTestimonials";
import TrainingCTA from "@/features/marketing/components/training/TrainingCTA";
import { Metadata } from "next";
import JsonLd from "@/shared/components/seo/JsonLd";
import {
    breadcrumbJsonLd,
    buildPageMetadata,
    courseListJsonLd,
    webPageJsonLd,
} from "@/shared/lib/seo";

const title = "Cursos de Vendas em Angola | Treinamento Comercial Beasell";
const description =
    "Cursos e treinamentos praticos em vendas, lideranca comercial e atendimento ao cliente para profissionais e empresas em Angola.";

export const metadata: Metadata = buildPageMetadata({
    title,
    description,
    path: "/treinamento",
    keywords: [
        "cursos vendas angola",
        "treinamento comercial luanda",
        "formacao lideranca comercial",
        "curso atendimento cliente angola",
    ],
});

export default function TrainingPage() {
    return (
        <div className="overflow-x-hidden">
            <JsonLd
                data={[
                    webPageJsonLd({
                        title,
                        description,
                        path: "/treinamento",
                        about: ["curso de vendas", "lideranca comercial", "atendimento ao cliente"],
                    }),
                    breadcrumbJsonLd([
                        { name: "Inicio", path: "/" },
                        { name: "Treinamento", path: "/treinamento" },
                    ]),
                    courseListJsonLd(),
                ]}
            />
            <TrainingHero />
            <TrainingFeatures />
            <TrainingCourses />
            <TrainingTestimonials />
            <TrainingCTA />
        </div>
    );
}
