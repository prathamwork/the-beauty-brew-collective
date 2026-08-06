import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import logoMark from "@/assets/blush-logo.png";

/** Brand mark + wordmark. `tone` switches the mark for dark surfaces. */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        src={logoMark}
        alt={`${site.name} monogram`}
        width={1024}
        height={1024}
        loading="lazy"
        className={cn(
          "h-9 w-9 shrink-0 object-contain transition-transform duration-700 ease-out will-change-transform hover:rotate-[8deg]",
          tone === "light" && "brightness-0 invert",
        )}
      />
      {showWordmark && (
        <span className="flex items-baseline gap-3">
          <span
            className={cn(
              "font-display text-2xl leading-none tracking-tight",
              tone === "light" ? "text-ivory" : "text-espresso",
            )}
          >
            {site.shortName}
          </span>
          <span
            className={cn(
              "hidden text-[0.6rem] uppercase tracking-[0.28em] sm:block",
              tone === "light" ? "text-champagne" : "text-mocha",
            )}
          >
            Salon &amp; Café
          </span>
        </span>
      )}
    </span>
  );
}
