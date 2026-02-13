import ProtectedLayout from "@/shared/components/layout/ProtectedLayout";
import { ReactNode } from "react";
import { AdminSidebar } from "@/shared/components/layout/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedLayout allowedRoles={["admin"]}>
            <SidebarProvider>
                <div className="flex min-h-screen bg-gray-50/50 w-full">
                    <AdminSidebar />
                    <div className="flex-1 flex flex-col min-w-0">
                        <header className="h-16 border-b flex items-center px-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                            <SidebarTrigger />
                            <div className="ml-4 h-5 w-[1px] bg-gray-200 hidden md:block" />
                            <div className="ml-4 hidden md:block">
                                <span className="text-sm font-medium text-gray-500">Backoffice Beasell</span>
                            </div>
                        </header>
                        <main className="flex-1 overflow-x-hidden">
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </ProtectedLayout>
    );
}
