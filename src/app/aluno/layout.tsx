import ProtectedLayout from "@/shared/components/layout/ProtectedLayout";
import StudentLayout from "@/shared/components/student/StudentLayout";
import { ReactNode } from "react";

export default function AlunoLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedLayout allowedRoles={["student"]}>
            <StudentLayout>
                {children}
            </StudentLayout>
        </ProtectedLayout>
    );
}
