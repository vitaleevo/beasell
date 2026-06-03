"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/shared/lib/auth-client";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
if (!convexUrl) {
    console.warn("NEXT_PUBLIC_CONVEX_URL is not defined. Convex features will not work.");
}
const convex = new ConvexReactClient(convexUrl || "https://dummy-deployment.convex.cloud");

export function ConvexClientProvider({
    children,
    initialToken,
}: {
    children: ReactNode;
    initialToken?: string | null;
}) {
    return (
        <ConvexBetterAuthProvider
            client={convex}
            authClient={authClient}
            initialToken={initialToken}
        >
            {children}
        </ConvexBetterAuthProvider>
    );
}
