import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "@/components/site/Reveal";

export function Section({
  children,
  className,
  id,
  tone = "ivory",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "soft" | "espresso";
}) {
  const tones = {
    ivory: "bg-ivory text-espresso",
    soft: "bg-ivory-soft text-espresso",
    espresso: "bg-espresso text-ivory",
  };
  return (
    <section id={id} className={cn("scroll-mt-28 py-20 md:py-28 lg:py-36", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className={cn("eyebrow", light ? "text-champagne" : "text-mocha")}>{eyebrow}</p>
        </Reveal>
      )}
      <RevealText
        as={as}
        text={title}
        delay={0.05}
        className={cn(
          "mt-5 text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.75rem]",
          light ? "text-ivory" : "text-espresso",
        )}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-6 max-w-xl text-[0.95rem] leading-relaxed",
              align === "center" && "mx-auto",
              light ? "text-ivory/70" : "text-muted-foreground",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
