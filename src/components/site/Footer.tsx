import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

import { site, navLinks } from "@/data/site";
import { Container } from "@/components/site/Section";
import { CtaAnchor } from "@/components/site/Cta";
import { presetLink } from "@/lib/whatsapp";
import { Logo } from "@/components/site/Logo";


export function Footer() {
  return (
    <footer className="bg-espresso-deep text-ivory/70">
      <Container className="grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-4 lg:py-24">
        <div>
          <Logo tone="light" showWordmark={false} className="mb-5" />
          <p className="font-display text-3xl text-ivory">{site.name}</p>

          <p className="mt-3 text-[0.7rem] uppercase tracking-[0.24em] text-champagne">
            {site.tagline}
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">{site.description}</p>
          <div className="mt-7 flex gap-3">
            <a
              href={site.instagramUrl}
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center border border-ivory/20 transition-colors hover:bg-ivory hover:text-espresso"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.facebookUrl}
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center border border-ivory/20 transition-colors hover:bg-ivory hover:text-espresso"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow text-champagne">Explore</p>
          <ul className="mt-6 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-champagne">Visit</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <a href={`tel:${site.phoneHref}`} className="hover:text-ivory">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <a href={`mailto:${site.email}`} className="hover:text-ivory">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-champagne">Hours</p>
          <ul className="mt-6 space-y-4 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                <p className="text-ivory">{h.days}</p>
                <p className="mt-1 text-xs tracking-wide">
                  Salon {h.salon} · Café {h.cafe}
                </p>
              </li>
            ))}
          </ul>
          <CtaAnchor
            variant="gold"
            size="sm"
            href={presetLink("general")}
            target="_blank"
            rel="noreferrer"
            className="mt-7"
          >
            WhatsApp Us
          </CtaAnchor>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col gap-2 py-6 text-[0.68rem] uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.instagram}</p>
        </Container>
      </div>
    </footer>
  );
}
