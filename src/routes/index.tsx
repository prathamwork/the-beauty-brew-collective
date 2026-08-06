import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";

import heroStyling from "@/assets/hero-styling.jpg";
import splitSalon from "@/assets/split-salon.jpg";
import splitCafe from "@/assets/split-cafe.jpg";
import philosophyMain from "@/assets/philosophy-main.jpg";
import philosophyInset from "@/assets/philosophy-inset.jpg";

import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { CtaButton, CtaLink } from "@/components/site/Cta";
import { useBooking } from "@/components/site/BookingProvider";
import { Orb3D, Tilt3D } from "@/components/site/Tilt3D";
import { site } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { featuredMenu } from "@/data/menu";
import { featuredPackages } from "@/data/packages";
import { testimonials } from "@/data/testimonials";
import { journeySteps } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blush Unisex Salon & Café — Beauty, Brewed Beautifully" },
      {
        name: "description",
        content:
          "Luxury salon and speciality café in Navsari. Hair, colour, skin and bridal rituals paired with handcrafted coffee. Book your appointment or reserve a table.",
      },
      { property: "og:title", content: "Blush Unisex Salon & Café — Navsari" },
      {
        property: "og:description",
        content:
          "Transformative beauty rituals and handcrafted coffee in one unhurried room on Lunsikui Road, Navsari.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const { openBooking } = useBooking();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);

  return (
    <div ref={ref} className="relative min-h-[92vh] overflow-hidden bg-espresso">
      <motion.img
        src={heroStyling}
        alt="Stylist finishing a glossy blow-dry in a warm ivory salon"
        style={{ y }}
        className="absolute inset-0 h-[115%] w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso-deep/90 via-espresso-deep/55 to-transparent" />
      <Orb3D className="absolute -right-16 top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-70 lg:block" />
      <Container className="relative flex min-h-[92vh] flex-col justify-center py-28">
        <Reveal>
          <p className="eyebrow text-champagne">Navsari · Salon &amp; Speciality Café</p>
        </Reveal>
        <RevealText
          as="h1"
          text="Beauty, Brewed Beautifully."
          delay={0.1}
          className="mt-6 max-w-3xl font-display text-[3rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[5.75rem]"
        />
        <Reveal delay={0.35}>
          <p className="mt-8 max-w-lg text-[0.95rem] leading-relaxed text-ivory/75">
            {site.description}
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-11 flex flex-wrap gap-3">
            <CtaButton variant="gold" size="lg" onClick={() => openBooking({ track: "salon" })}>
              Book an appointment
            </CtaButton>
            <CtaButton variant="light" size="lg" onClick={() => openBooking({ track: "cafe" })}>
              Reserve a table
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

function SplitWorlds() {
  const panels = [
    {
      img: splitSalon,
      alt: "Guest with a glass-smooth blowout in the salon chair",
      eyebrow: "The Salon",
      title: "Hair, colour, skin and bridal",
      copy: "Shape-led cutting, patient colour and diagnostic skin rituals, with specialists you can book by name.",
      to: "/salon",
      cta: "Explore the salon",
    },
    {
      img: splitCafe,
      alt: "Latte and a small dessert on a marble café table",
      eyebrow: "The Café",
      title: "Single-estate coffee and slow afternoons",
      copy: "Beans from two Chikmagalur estates, roasted weekly, poured beside the colour bar all day long.",
      to: "/cafe",
      cta: "See the menu",
    },
  ] as const;

  return (
    <div className="grid md:grid-cols-2">
      {panels.map((p, i) => (
        <Reveal key={p.to} delay={i * 0.1} className="group relative min-h-[62vh] overflow-hidden">
          <Link to={p.to} className="block h-full">
            <img
              src={p.img}
              alt={p.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/85 via-espresso-deep/25 to-transparent" />
            <div className="relative flex h-full min-h-[62vh] flex-col justify-end p-8 lg:p-14">
              <p className="eyebrow text-champagne">{p.eyebrow}</p>
              <h2 className="mt-4 max-w-sm font-display text-4xl leading-tight text-ivory lg:text-5xl">
                {p.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">{p.copy}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-ivory">
                {p.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

function Index() {
  const { openBooking } = useBooking();

  return (
    <>
      <Hero />
      <SplitWorlds />

      <Section tone="ivory">
        <Container>
          <SectionHeading
            eyebrow="Our philosophy"
            title="A room designed to slow you down"
            intro="Blush was built around a simple observation: the waiting is usually the worst part. So we made the waiting the point — a coffee bar you can sit at, and chairs you can be served at, in one continuous room."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <img
                src={philosophyMain}
                alt="Guest resting with a coffee in the salon lounge"
                className="h-[60vh] w-full object-cover"
              />
            </Reveal>
            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              <Reveal delay={0.1}>
                <img
                  src={philosophyInset}
                  alt="Detail of a coffee cup resting beside styling tools"
                  className="h-[28vh] w-full object-cover"
                />
              </Reveal>
              <Reveal delay={0.2}>
                <blockquote className="border-l border-champagne pl-6 font-display text-2xl leading-snug text-espresso lg:text-3xl">
                  “Everyone who walks in is a guest before they are a client. That order does not
                  change once you are in the chair.”
                  <footer className="mt-4 text-[0.65rem] uppercase tracking-[0.22em] text-mocha">
                    Aarohi Desai · Founder
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Salon" title="Signature services" className="max-w-lg" />
            <Reveal delay={0.1}>
              <CtaLink variant="outline" to="/salon">
                Full service menu
              </CtaLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.slice(0, 8).map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 0.08} className="group">
                <button
                  onClick={() => openBooking({ track: "salon" })}
                  className="block w-full text-left"
                >
                  <div className="overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-2xl text-espresso">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                      From {s.from} · {s.duration}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="espresso">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              light
              eyebrow="Café"
              title="From the coffee bar"
              className="max-w-lg"
            />
            <Reveal delay={0.1}>
              <CtaLink variant="light" to="/cafe">
                See the full menu
              </CtaLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMenu.slice(0, 4).map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08} className="group">
                {m.image && (
                  <div className="overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.alt ?? m.name}
                      className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-ivory">{m.name}</h3>
                    <span className="text-sm text-champagne">{m.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Signature experiences"
            title="Salon and café, written as one ritual"
            intro="Packages that treat the beverage as part of the service rather than an afterthought."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featuredPackages.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} className="group flex flex-col bg-ivory-soft">
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-3xl text-espresso">{p.name}</h3>
                  <p className="mt-2 text-sm italic text-mocha">{p.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-espresso/10 pt-5">
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                      {p.duration}
                    </span>
                    <span className="font-display text-2xl text-espresso">{p.price}</span>
                  </div>
                  <CtaButton
                    variant="outline"
                    className="mt-5 w-full"
                    magnetic={false}
                    onClick={() => openBooking({ track: "experience", selectionId: p.id })}
                  >
                    Book this experience
                  </CtaButton>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeading eyebrow="How it works" title="Five steps, then nothing to think about" />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
            {journeySteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <p className="font-display text-5xl text-champagne">{s.n}</p>
                <h3 className="mt-4 font-display text-2xl text-espresso">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <SectionHeading align="center" eyebrow="Guests" title="What people say afterwards" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.08} className="border border-espresso/10 p-8">
                <div className="flex gap-1 text-champagne">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-snug text-espresso">“{t.quote}”</p>
                <p className="mt-6 text-[0.65rem] uppercase tracking-[0.2em] text-mocha">
                  {t.name} · {t.service}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="espresso" className="py-24 md:py-32">
        <Container className="text-center">
          <RevealText
            text="Your table and your chair are waiting."
            className="mx-auto max-w-3xl font-display text-4xl leading-tight text-ivory sm:text-6xl"
          />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CtaButton variant="gold" size="lg" onClick={() => openBooking()}>
                Book now
              </CtaButton>
              <CtaLink variant="light" size="lg" to="/contact">
                Visit us
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
