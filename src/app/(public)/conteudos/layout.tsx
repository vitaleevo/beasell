import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conteúdos e Estratégias de Vendas",
    description: "Explore o nosso blog para aprender técnicas de vendas, prospecção e gestão comercial focadas no mercado angolano.",
    keywords: "blog vendas angola, dicas comerciais, estratégias de negócios luanda",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
