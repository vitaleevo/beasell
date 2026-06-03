"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { GraduationCap, LayoutDashboard, LogIn, LogOut, UserCircle } from "lucide-react";
import { api } from "@convex/_generated/api";
import { authClient } from "@/shared/lib/auth-client";
import { Button } from "@/shared/components/ui/button";

const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

export default function UserNav() {
  const router = useRouter();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const { data: session, isPending } = authClient.useSession();
  const currentUser = useQuery(api.users.currentUser, session ? {} : "skip");
  const ensureCurrentUser = useMutation(api.users.ensureCurrentUser);
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    if (session && currentUser === null) {
      void ensureCurrentUser();
    }
  }, [session, currentUser, ensureCurrentUser]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  if (!isHydrated || isPending) {
    return <div aria-hidden="true" className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />;
  }

  if (!session) {
    return (
      <Button
        asChild
        variant="ghost"
        className="text-gray-700 transition-colors hover:text-blue-900"
      >
        <Link href="/sign-in">
          <LogIn className="mr-2 h-4 w-4" />
          Entrar
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden border-blue-900 text-blue-900 hover:bg-blue-50 sm:inline-flex"
        >
          <Link href="/admin/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Painel Admin
          </Link>
        </Button>
      )}

      <Button
        asChild
        variant="outline"
        size="sm"
        className="hidden border-blue-900 text-blue-900 hover:bg-blue-50 lg:inline-flex"
      >
        <Link href="/plataforma/meus-cursos">
          <GraduationCap className="mr-2 h-4 w-4" />
          Meus Cursos
        </Link>
      </Button>

      <div className="hidden items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm sm:flex">
        <UserCircle className="h-4 w-4 text-blue-900" />
        <span className="max-w-32 truncate">{session.user.name || session.user.email}</span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleSignOut}
        aria-label="Sair"
        className="text-gray-600 hover:text-red-600"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
