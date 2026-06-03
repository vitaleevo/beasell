import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/shared/lib/auth-server";

export const dynamic = "force-dynamic";

export default async function LessonLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const authenticated = process.env.NEXT_PUBLIC_CONVEX_SITE_URL
    ? await isAuthenticated().catch(() => false)
    : false;

  if (!authenticated) {
    const { slug, lessonId } = await params;
    redirect(`/sign-in?redirect=/plataforma/cursos/${slug}/aulas/${lessonId}`);
  }

  return <>{children}</>;
}
