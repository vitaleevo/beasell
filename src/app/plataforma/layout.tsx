import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import MobileTabNavigation from "@/shared/components/layout/MobileTabNavigation";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/40">
      <Header />
      <main className="flex-1 pt-[60px] pb-20 md:pt-24 md:pb-0 lg:pt-32">{children}</main>
      <Footer />
      <MobileTabNavigation />
    </div>
  );
}
