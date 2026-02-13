"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedLayoutProps {
    children: ReactNode;
    allowedRoles?: ("admin" | "student")[];
}

export default function ProtectedLayout({
    children,
    allowedRoles,
}: ProtectedLayoutProps) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const user = useQuery(api.users.currentUser);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/sign-in");
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated && user && allowedRoles) {
            if (!allowedRoles.includes(user.role)) {
                router.push("/unauthorized");
            }
        }
    }, [isAuthenticated, user, allowedRoles, router]);

    if (isLoading || (isAuthenticated && user === undefined)) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-900" />
                    <p className="mt-4 text-gray-600 font-medium">A carregar...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
