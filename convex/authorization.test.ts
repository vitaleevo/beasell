import { describe, expect, it } from "vitest";
import {
    canReadRestrictedContent,
    isPublicPublishedListing,
    parseAdminEmails,
    roleForEmail,
} from "./authorization";

describe("authorization policy", () => {
    it("normalizes configured admin emails", () => {
        const admins = parseAdminEmails(" admin@beasell.ao,OPS@beasell.ao ,, ");

        expect(admins.has("admin@beasell.ao")).toBe(true);
        expect(admins.has("ops@beasell.ao")).toBe(true);
        expect(admins.size).toBe(2);
    });

    it("assigns admin role only to configured emails", () => {
        const adminEmails = "admin@beasell.ao";

        expect(roleForEmail("ADMIN@beasell.ao", adminEmails)).toBe("admin");
        expect(roleForEmail("student@beasell.ao", adminEmails)).toBe("student");
        expect(roleForEmail(undefined, adminEmails)).toBe("student");
    });

    it("keeps restricted query data admin-only", () => {
        expect(canReadRestrictedContent("admin")).toBe(true);
        expect(canReadRestrictedContent("student")).toBe(false);
        expect(canReadRestrictedContent(undefined)).toBe(false);
    });

    it("treats only published listings as public", () => {
        expect(isPublicPublishedListing(true)).toBe(true);
        expect(isPublicPublishedListing(false)).toBe(false);
        expect(isPublicPublishedListing(undefined)).toBe(false);
    });
});
