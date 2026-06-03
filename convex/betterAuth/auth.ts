import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "@convex-dev/better-auth/utils";
import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from "better-auth";
import { components } from "../_generated/api";
import type { DataModel } from "../_generated/dataModel";
import authConfig from "../auth.config";
import schema from "./schema";

type BetterAuthComponent = Parameters<typeof createClient<DataModel, typeof schema>>[0];
const betterAuthComponent = (components as unknown as { betterAuth: BetterAuthComponent }).betterAuth;

export const authComponent = createClient<DataModel, typeof schema>(
    betterAuthComponent,
    {
        local: { schema },
        verbose: false,
    }
);

function parseTrustedOrigins(value: string | undefined, siteUrl: string | undefined) {
    return Array.from(
        new Set(
            [siteUrl, ...(value ?? "").split(",")]
                .map((origin) => origin?.trim())
                .filter((origin): origin is string => Boolean(origin))
        )
    );
}

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
    return {
        appName: "Beasell Angola",
        baseURL: process.env.SITE_URL,
        trustedOrigins: parseTrustedOrigins(
            process.env.BETTER_AUTH_TRUSTED_ORIGINS,
            process.env.SITE_URL
        ),
        secret: process.env.BETTER_AUTH_SECRET,
        database: authComponent.adapter(ctx),
        emailAndPassword: {
            enabled: true,
        },
        rateLimit: {
            enabled: true,
            storage: "database",
            window: 60,
            max: 100,
            customRules: {
                "/api/auth/sign-in/*": {
                    window: 60,
                    max: 5,
                },
                "/api/auth/sign-up/*": {
                    window: 300,
                    max: 5,
                },
                "/sign-in/*": {
                    window: 60,
                    max: 5,
                },
                "/sign-up/*": {
                    window: 300,
                    max: 5,
                },
                "/request-password-reset": {
                    window: 300,
                    max: 3,
                },
                "/forget-password": {
                    window: 300,
                    max: 3,
                },
            },
        },
        advanced: {
            ipAddress: {
                ipAddressHeaders: [
                    "x-forwarded-for",
                    "x-real-ip",
                    "x-vercel-forwarded-for",
                    "cf-connecting-ip",
                    "true-client-ip",
                    "x-client-ip",
                ],
                ipv6Subnet: 64,
            },
        },
        plugins: [convex({ authConfig })],
    } satisfies BetterAuthOptions;
};

export const options = createAuthOptions({} as GenericCtx<DataModel>);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth(createAuthOptions(ctx));
};
