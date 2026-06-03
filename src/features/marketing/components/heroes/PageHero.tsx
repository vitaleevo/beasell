import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  onCtaClick,
  className = "",
  children,
}) => {
  const heroStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section className={`relative overflow-hidden pt-20 pb-12 ${className}`}>
      {backgroundImage && (
        <div className="absolute inset-0" style={heroStyle}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto my-[100px] max-w-4xl text-center">
          {subtitle && (
            <div
              className={`mb-4 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${backgroundImage ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm" : "from-brand-blue-100 to-brand-orange-100 text-brand-blue bg-gradient-to-r"}`}
            >
              {subtitle}
            </div>
          )}

          <h1
            className={`mb-4 text-2xl leading-tight font-bold md:text-4xl lg:text-5xl ${backgroundImage ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </h1>

          <p
            className={`mx-auto mb-6 max-w-3xl text-base leading-relaxed md:text-lg lg:text-xl ${backgroundImage ? "text-gray-200" : "text-gray-600"}`}
          >
            {description}
          </p>

          {(ctaText || ctaLink || onCtaClick) && (
            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
              {ctaLink ? (
                <Button
                  size="lg"
                  className="from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange-700 hover:shadow-brand-orange/25 bg-gradient-to-r px-6 py-3 text-base text-white shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  asChild
                >
                  <Link href={ctaLink}>
                    {ctaText || "Saiba Mais"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange-700 hover:shadow-brand-orange/25 bg-gradient-to-r px-6 py-3 text-base text-white shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  onClick={onCtaClick}
                >
                  {ctaText || "Saiba Mais"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
