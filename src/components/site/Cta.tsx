import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 min-h-11",
  {
    variants: {
      variant: {
        solid: "bg-espresso text-ivory-soft hover:bg-espresso-deep",
        outline: "border border-espresso/30 text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory-soft",
        light: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-espresso",
        gold: "bg-champagne text-espresso-deep hover:bg-champagne/85",
        ghost: "text-espresso hover:text-mocha",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-5 py-2.5 text-[0.65rem]",
        lg: "px-9 py-4",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  },
);

type Common = VariantProps<typeof ctaVariants> & { className?: string; children: ReactNode };

/** Magnetic hover wrapper — disabled for reduced motion and touch. */
function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (reduced) return <span className={cn("inline-flex", className)}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex", className)}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * 0.18,
          y: (e.clientY - (r.top + r.height / 2)) * 0.28,
        });
      }}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );
}

export function CtaButton({
  variant,
  size,
  className,
  children,
  magnetic = true,
  ...props
}: Common & ComponentProps<"button"> & { magnetic?: boolean }) {
  const btn = (
    <button className={cn(ctaVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}

export function CtaLink({
  variant,
  size,
  className,
  children,
  to,
  hash,
  magnetic = true,
}: Common & { to: string; hash?: string; magnetic?: boolean }) {
  const link = (
    <Link to={to} hash={hash} className={cn(ctaVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

export function CtaAnchor({
  variant,
  size,
  className,
  children,
  magnetic = true,
  ...props
}: Common & ComponentProps<"a"> & { magnetic?: boolean }) {
  const a = (
    <a className={cn(ctaVariants({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
  return magnetic ? <Magnetic>{a}</Magnetic> : a;
}
