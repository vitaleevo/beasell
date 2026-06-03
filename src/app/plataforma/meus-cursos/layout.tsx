import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/shared/lib/auth-server";

export const dynamic = "force-dynamic";

export default async function MyCoursesLayout({ children }: { children: ReactNode }) {
  const authenticated = process.env.NEXT_PUBLIC_CONVEX_SITE_URL
    ? await isAuthenticated().catch(() => false)
    : false;

  if (!authenticated) {
    redirect("/sign-in?redirect=/plataforma/meus-cursos");
  }

  return <>{children}</>;
}
