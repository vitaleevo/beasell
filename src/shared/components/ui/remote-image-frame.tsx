import type { CSSProperties } from "react";

import { cn } from "@/shared/lib/utils";

interface RemoteImageFrameProps {
  src?: string | null;
  alt?: string;
  className?: string;
  decorative?: boolean;
}

function normalizeImageUrl(src?: string | null) {
  const value = src?.trim();

  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return null;
  }

  return null;
}

export function RemoteImageFrame({
  src,
  alt,
  className,
  decorative = false,
}: RemoteImageFrameProps) {
  const imageUrl = normalizeImageUrl(src);
  const style: CSSProperties | undefined = imageUrl
    ? { backgroundImage: `url(${JSON.stringify(imageUrl)})` }
    : undefined;
  const accessibilityProps = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": alt || "Imagem" } as const);

  return (
    <div
      {...accessibilityProps}
      className={cn("overflow-hidden bg-gray-100 bg-cover bg-center", className)}
      style={style}
    />
  );
}
