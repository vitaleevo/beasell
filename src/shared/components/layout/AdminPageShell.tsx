import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface AdminPageShellProps {
  children: ReactNode;
  className?: string;
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  className?: string;
}

export function AdminPageShell({ children, className }: AdminPageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  eyebrow,
  icon: Icon,
  actions,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-5 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-blue-900 uppercase">
            {Icon && <Icon className="h-4 w-4" />}
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
