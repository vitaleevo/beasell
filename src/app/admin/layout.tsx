import ProtectedLayout from "@/shared/components/layout/ProtectedLayout";
import { ReactNode } from "react";
import { AdminSidebar } from "@/shared/components/layout/AdminSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { isAuthenticated } from "@/shared/lib/auth-server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const authenticated = process.env.NEXT_PUBLIC_CONVEX_SITE_URL
        ? await isAuthenticated().catch(() => false)
        : false;

    if (!authenticated) {
        redirect("/sign-in?redirect=/admin/dashboard");
    }

    return (
        <ProtectedLayout allowedRoles={["admin"]}>
            <SidebarProvider className="min-h-screen overflow-x-hidden bg-gray-50/50">
                <AdminSidebar />
                <SidebarInset className="min-w-0 bg-gray-50/50">
                    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white/80 px-4 backdrop-blur-md">
                        <SidebarTrigger />
                        <div className="ml-4 hidden h-5 w-px bg-gray-200 md:block" />
                        <div className="ml-4 hidden md:block">
                            <span className="text-sm font-medium text-gray-500">Backoffice Beasell</span>
                        </div>
                    </header>
                    <main className="min-w-0 flex-1 overflow-x-hidden">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedLayout>
    );
}
