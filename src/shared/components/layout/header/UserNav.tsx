"use client";

import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser
} from "@clerk/nextjs";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogIn } from "lucide-react";

export default function UserNav() {
    const { user } = useUser();
    const isAdmin = user?.publicMetadata?.role === "admin";

    return (
        <div className="flex items-center gap-4">
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-900 transition-colors">
                        <LogIn className="h-4 w-4 mr-2" />
                        Entrar
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <div className="flex items-center gap-3">
                    {isAdmin && (
                        <Button asChild variant="outline" size="sm" className="border-blue-900 text-blue-900 hover:bg-blue-50 hidden sm:inline-flex">
                            <Link href="/admin/dashboard">
                                <LayoutDashboard className="h-4 w-4 mr-2" />
                                Painel Admin
                            </Link>
                        </Button>
                    )}
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-10 w-10 border-2 border-blue-900/10 hover:border-blue-900/30 transition-all"
                            }
                        }}
                    />
                </div>
            </SignedIn>
        </div>
    );
}
