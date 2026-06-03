"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Role = "admin" | "super_admin" | "student";

interface ProtectedLayoutProps {
    children: ReactNode;
    allowedRoles?: Role[];
}

function hasAllowedRole(role: Role | undefined, allowedRoles: Role[] | undefined) {
    if (!allowedRoles) return true;
    if (!role) return false;
    if (role === "super_admin" && allowedRoles.includes("admin")) return true;
    return allowedRoles.includes(role);
}

export default function ProtectedLayout({
    children,
    allowedRoles,
}: ProtectedLayoutProps) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const user = useQuery(api.users.currentUser);
    const ensureCurrentUser = useMutation(api.users.ensureCurrentUser);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/sign-in");
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (!isAuthenticated || user !== null) return;

        void ensureCurrentUser();
    }, [isAuthenticated, user, ensureCurrentUser]);

    useEffect(() => {
        if (isAuthenticated && user && allowedRoles) {
            if (!hasAllowedRole(user.role, allowedRoles)) {
                router.push("/unauthorized");
            }
        }
    }, [isAuthenticated, user, allowedRoles, router]);

    if (isLoading || (isAuthenticated && (user === undefined || user === null))) {
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

    if (allowedRoles && user && !hasAllowedRole(user.role, allowedRoles)) {
        return null;
    }

    return <>{children}</>;
}
