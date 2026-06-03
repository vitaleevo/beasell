/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as audit from "../audit.js";
import type * as auditLogs from "../auditLogs.js";
import type * as authorization from "../authorization.js";
import type * as blog from "../blog.js";
import type * as certificates from "../certificates.js";
import type * as courseProgress from "../courseProgress.js";
import type * as courses from "../courses.js";
import type * as http from "../http.js";
import type * as operations from "../operations.js";
import type * as paymentProof from "../paymentProof.js";
import type * as payments from "../payments.js";
import type * as rateLimit from "../rateLimit.js";
import type * as seed from "../seed.js";
import type * as services from "../services.js";
import type * as users from "../users.js";
import type * as utils from "../utils.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  audit: typeof audit;
  auditLogs: typeof auditLogs;
  authorization: typeof authorization;
  blog: typeof blog;
  certificates: typeof certificates;
  courseProgress: typeof courseProgress;
  courses: typeof courses;
  http: typeof http;
  operations: typeof operations;
  paymentProof: typeof paymentProof;
  payments: typeof payments;
  rateLimit: typeof rateLimit;
  seed: typeof seed;
  services: typeof services;
  users: typeof users;
  utils: typeof utils;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("../betterAuth/_generated/component.js").ComponentApi<"betterAuth">;
};
