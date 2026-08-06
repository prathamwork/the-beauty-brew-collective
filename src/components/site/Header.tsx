import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { site, navLinks, announcements } from "@/data/site";
import { CtaButton } from "@/components/site/Cta";
import { useBooking } from "@/components/site/BookingProvider";
import { Logo } from "@/components/site/Logo";


function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % announcements.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-espresso-deep text-ivory/80">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-center overflow-hidden px-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-[0.62rem] uppercase tracking-[0.22em]"
          >
            {announcements[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={cn(
          "border-b transition-colors duration-500",
          scrolled
            ? "border-espresso/10 bg-ivory/92 backdrop-blur-xl"
            : "border-transparent bg-ivory",
        )}
      >
        <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>


          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative text-[0.68rem] uppercase tracking-[0.2em] text-espresso/70 transition-colors hover:text-espresso",
                  pathname === l.to && "text-espresso",
                )}
              >
                {l.label}
                {pathname === l.to && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-champagne"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phoneHref}`}
              aria-label="Call the salon"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:bg-espresso hover:text-ivory md:flex"
            >
              <Phone className="h-4 w-4" />
            </a>
            <CtaButton size="sm" onClick={() => openBooking()} className="hidden sm:inline-flex">
              Book Now
            </CtaButton>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center text-espresso lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-espresso/10 bg-ivory lg:hidden"
          >
            <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block border-b border-espresso/8 py-4 font-display text-2xl text-espresso last:border-0"
                >
                  {l.label}
                </Link>
              ))}
              <CtaButton className="mt-6 w-full" onClick={() => openBooking()} magnetic={false}>
                Book Now
              </CtaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
