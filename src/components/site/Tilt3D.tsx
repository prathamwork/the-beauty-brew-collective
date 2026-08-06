import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt-on-hover wrapper with a moving specular sheen.
 * Purely presentational; disables itself when reduced motion is requested.
 */
export function Tilt3D({
  children,
  className,
  intensity = 8,
  sheen = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  sheen?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 180, damping: 20, mass: 0.4 });

  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const sheenX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(sy, [0, 1], ["0%", "100%"]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => {
          setActive(false);
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ scale: active ? 1.015 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
        {sheen && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
            style={{
              opacity: active ? 0.55 : 0,
              background: `radial-gradient(220px circle at ${sheenX.get()}% ${sheenY.get()}%, var(--color-champagne), transparent 65%)`,
              transition: "opacity 400ms ease",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/** Slowly rotating wireframe orb built from CSS 3D rings — a quiet luxury accent. */
export function Orb3D({ className, rings = 5 }: { className?: string; rings?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("pointer-events-none [perspective:900px]", className)} aria-hidden>
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduced ? undefined : { rotateY: 360, rotateX: [0, 12, 0] }}
        transition={{
          rotateY: { duration: 34, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 17, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {Array.from({ length: rings }).map((_, i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border border-champagne/35"
            style={{ transform: `rotateY(${(180 / rings) * i}deg)` }}
          />
        ))}
        <span className="absolute inset-0 rounded-full border border-ivory/15" style={{ transform: "rotateX(90deg)" }} />
      </motion.div>
    </div>
  );
}
