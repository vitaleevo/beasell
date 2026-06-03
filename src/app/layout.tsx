import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AdminProvider } from "@/shared/context/AdminContext";
import { ConvexClientProvider } from "@/shared/components/providers/ConvexClientProvider";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { getToken } from "@/shared/lib/auth-server";
import { buildPageMetadata, SITE, SITE_URL } from "@/shared/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Beasell Angola | Formacao, Consultoria e Vendas em Angola",
    description:
      "A Beasell ajuda empresas e profissionais em Angola a vender mais com formacao comercial, consultoria de gestao, prospeccao e atendimento ao cliente.",
    path: "/",
    keywords: [
      "empresa de vendas em angola",
      "formacao comercial angola",
      "consultoria para empresas angola",
      "curso atendimento ao cliente luanda",
    ],
  }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beasell Angola | Formacao, Consultoria e Vendas em Angola",
    template: "%s | Beasell Angola",
  },
  applicationName: SITE.fullName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  publisher: SITE.legalName,
  category: "business",
  classification:
    "Formacao de vendas, consultoria comercial e gestao de negocios em Angola",
  icons: {
    icon: "/lovable-uploads/bb733a9a-7051-432b-ae49-6ddb75b0342a.png",
    apple: "/lovable-uploads/bb733a9a-7051-432b-ae49-6ddb75b0342a.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A2A49",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token =
    process.env.NEXT_PUBLIC_CONVEX_URL && process.env.NEXT_PUBLIC_CONVEX_SITE_URL
      ? await getToken().catch(() => null)
      : null;

  return (
    <html lang="pt-AO">
      <body className="overflow-x-hidden font-sans antialiased">
        <ConvexClientProvider initialToken={token}>
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
