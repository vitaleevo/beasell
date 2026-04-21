"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
if (!convexUrl) {
    console.warn("NEXT_PUBLIC_CONVEX_URL is not defined. Convex features will not work.");
}
// Use a valid-looking URL format to avoid fatal parsing errors in development
const convex = new ConvexReactClient(convexUrl || "https://dummy-deployment.convex.cloud");

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
