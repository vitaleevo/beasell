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
        plugins: [convex({ authConfig })],
    } satisfies BetterAuthOptions;
};

export const options = createAuthOptions({} as GenericCtx<DataModel>);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth(createAuthOptions(ctx));
};
