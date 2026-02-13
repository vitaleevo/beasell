import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Beasell Angola | Formação e Consultoria de Vendas",
    template: "%s | Beasell Angola"
  },
  description: "Lideramos a transformação comercial em Angola. Formação especializada, consultoria em vendas e prospecção corporativa.",
  keywords: ["vendas", "angola", "formação", "consultoria", "luanda", "prospecção"],
  icons: {
    icon: "/lovable-uploads/bb733a9a-7051-432b-ae49-6ddb75b0342a.png",
    apple: "/lovable-uploads/bb733a9a-7051-432b-ae49-6ddb75b0342a.png",
  },
  openGraph: {
    title: "Beasell Angola",
    description: "Transforme a sua força de vendas com especialistas no mercado angolano.",
    url: "https://beasell.ao",
    siteName: "Beasell",
    locale: "pt_AO",
    type: "website",
  },
};

import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { ConvexClientProvider } from "@/shared/components/providers/ConvexClientProvider";
import { AdminProvider } from "@/shared/context/AdminContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ConvexClientProvider>
          <AdminProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </AdminProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
