import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://dummy-deployment.convex.cloud";
const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? "https://dummy-deployment.convex.site";

export const {
    handler,
    preloadAuthQuery,
    isAuthenticated,
    getToken,
    fetchAuthQuery,
    fetchAuthMutation,
    fetchAuthAction,
} = convexBetterAuthNextJs({
    convexUrl,
    convexSiteUrl,
});
