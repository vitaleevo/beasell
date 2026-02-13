import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import MobileTabNavigation from "@/shared/components/layout/MobileTabNavigation";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50/30">
            <Header />
            <main className="flex-1 pt-[60px] md:pt-24 lg:pt-32 pb-20 md:pb-0">
                {children}
            </main>
            <Footer />
            <MobileTabNavigation />
        </div>
    );
}
